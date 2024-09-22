const puppeteer = require('puppeteer');

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

async function searchFlights(origin, destination, startDate, days) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const cheapestTickets = [];

    try {
        for (let i = 0; i < parseInt(days); i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            const formattedDate = currentDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

            const url = `https://ticket.flypobeda.ru/websky/?origin-city-code[0]=${cities[origin].code}&destination-city-code[0]=${cities[destination].code}&date[0]=${formattedDate}&segmentsCount=1&adultsCount=1&youngAdultsCount=0&childrenCount=0&infantsWithSeatCount=0&infantsWithoutSeatCount=0&lang=ru#/search`;

            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.waitForSelector('.price-cell__text', { timeout: 30000 });

            const prices = await page.evaluate(() => {
                const priceElements = document.querySelectorAll('.price-cell__text');
                return Array.from(priceElements).map(el => parseFloat(el.textContent.replace('₽', '').replace(/\s/g, '')));
            });

            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                const minPriceIndex = prices.indexOf(minPrice);

                const flightInfo = await page.evaluate((index) => {
                    const flightInfoElement = document.querySelectorAll('.contentRow')[index];
                    const timeElement = flightInfoElement.querySelector('.time');
                    const [departureTime, arrivalTime] = timeElement.textContent.split(' – ');
                    return { departureTime, arrivalTime };
                }, minPriceIndex);

                cheapestTickets.push({
                    date: formattedDate,
                    price: minPrice,
                    departure_time: flightInfo.departureTime,
                    arrival_time: flightInfo.arrivalTime
                });
            }
        }
    } catch (error) {
        console.error('Error during flight search:', error);
    } finally {
        await browser.close();
    }

    return { cheapestTickets };
}

module.exports = { searchFlights };
