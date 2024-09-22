# Поиск авиабилетов "Победа"

## Описание

Это веб-приложение, которое позволяет искать самые дешевые авиабилеты авиакомпании "Победа" на заданный период времени. 

## Технологии

* **Node.js:** серверная часть приложения.
* **Express.js:** фреймворк для Node.js, используемый для создания веб-сервера.
* **Puppeteer:** библиотека Node.js для управления браузером Chrome или Chromium в headless-режиме, используемая для парсинга данных с сайта "Победы".
* **HTML, CSS, JavaScript:** клиентская часть приложения.

## Установка и запуск

1. Клонируйте репозиторий: `git clone <репозиторий>`
2. Перейдите в папку проекта: `cd <папка_проекта>`
3. Установите зависимости: `npm install`
4. Запустите сервер: `node server.js`
5. Откройте браузер и перейдите по адресу `http://localhost:7777`

## Использование

1. Выберите город отправления и город назначения из выпадающих списков.
2. Укажите дату начала поиска (формат ДД.ММ.ГГГГ).
3. Укажите количество дней, в течение которых нужно искать билеты (максимум 30).
4. Нажмите кнопку "Найти билеты".

## Результаты

Приложение отобразит таблицу с самыми дешевыми билетами, найденными за указанный период. Таблица содержит следующие столбцы:

* **Дата:** дата вылета.
* **Цена:** цена билета в рублях.
* **Вылет:** время вылета.
* **Прилет:** время прилета.

Также будет выделен самый дешевый билет из найденных.

## Ограничения

* Приложение использует парсинг сайта "Победы", поэтому его работа может быть нарушена при изменении структуры сайта.
* Приложение ищет билеты только на одного взрослого пассажира.
* Приложение не учитывает дополнительные услуги, такие как багаж или выбор места.

## Примечания

* Код приложения написан на JavaScript и использует асинхронные функции (async/await).
* Приложение использует библиотеку Puppeteer для взаимодействия с сайтом "Победы". 
* Приложение использует Express.js для создания простого веб-сервера.

## Лицензия

MIT
