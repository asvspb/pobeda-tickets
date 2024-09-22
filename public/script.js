const cities = {
    '1': { name: 'Санкт-Петербург', code: 'LED' },
    '2': { name: 'Волгоград', code: 'VOG' },
    '3': { name: 'Москва', code: 'MOW' },
    '4': { name: 'Саратов', code: 'RTW' },
    '5': { name: 'Калининград', code: 'KGD' },
    '6': { name: 'Краснодар', code: 'KRR' },
    '7': { name: 'Сочи', code: 'AER' },
    '8': { name: 'Омск', code: 'OMS' },
    '9': { name: 'Абу-Даби', code: 'AUH' },
    '10': { name: 'Аланья', code: 'GZP' }
};

document.addEventListener('DOMContentLoaded', () => {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');
    const cheapestTicketDiv = document.getElementById('cheapestTicket');
    const ticketsTableBody = document.querySelector('#ticketsTable tbody');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // Заполняем селекты городами
    Object.entries(cities).forEach(([key, city]) => {
        const option = new Option(`${city.code} - ${city.name}`, key);
        originSelect.add(option.cloneNode(true));
        destinationSelect.add(option);
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const origin = originSelect.value;
        const destination = destinationSelect.value;
        const startDate = document.getElementById('startDate').value;
        const days = document.getElementById('days').value;

        if (origin === destination) {
            alert('Города отправления и назначения должны различаться');
            return;
        }

        resultsDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ origin, destination, startDate, days }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }

            const data = await response.json();

            if (data.cheapestTickets.length > 0) {
                displayResults(data);
            } else {
                throw new Error('Билеты не найдены');
            }
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
        } finally {
            loadingDiv.classList.add('hidden');
        }
    });

    function displayResults(data) {
        const cheapestTicket = data.cheapestTickets.reduce((min, ticket) => ticket.price < min.price ? ticket : min);

        cheapestTicketDiv.innerHTML = `
            <h3>Самый дешевый билет:</h3>
            <p>Дата: ${cheapestTicket.date}, Цена: ${cheapestTicket.price}₽, 
               Вылет: ${cheapestTicket.departure_time}, Прилет: ${cheapestTicket.arrival_time}</p>
        `;

        ticketsTableBody.innerHTML = '';
        data.cheapestTickets.forEach(ticket => {
            const row = ticketsTableBody.insertRow();
            row.innerHTML = `
                <td>${ticket.date}</td>
                <td>${ticket.price}₽</td>
                <td>${ticket.departure_time}</td>
                <td>${ticket.arrival_time}</td>
            `;
        });

        resultsDiv.classList.remove('hidden');
    }
});
