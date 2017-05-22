'use strict';

const symbol = ['a', 'b', 'c'];
const form = document.forms.textInsert;
const textarea = form.elements.letter;
const statContainer = document.querySelector('.letters-stat');

let counter = {};
let statElements = {};
let dataWidget = {
    'labels': [],
    'datasets': [
        {
            data: [],
            backgroundColor: []
        }
    ]
};

let getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

//считаем кол-во символов
let changeCounter = (letter) => counter[letter]++;

//выводим статистику на страницу
let setStat = () => {
    symbol.forEach((item, index) => {
        if (statElements[item]) {
            statElements[item].textContent = counter[item];
        }

        countWidget.data.datasets[0].data[index] = counter[item];

        //обнуляем счетчик для последующих подсчетов
        counter[item] = 0;
    });

    countWidget.update();
};

symbol.forEach((item) => {
    //устанавливаем счетчик
    counter[item] = 0;

    //создаем элементы для записи статистики
    let statElement = document.createElement('div');

    statElement.className = "letters-stat-item letter-" + item;
    statElement.innerHTML = '<div class="letter">' + item + ':</div><div class="letter-stat">' + counter[item] + '</div>';
    statContainer.appendChild(statElement);
    statElements[item] = statElement.querySelector('.letter-stat');

    //устанавливаем начальные значения виджета
    dataWidget['labels'].push(item);
    dataWidget['datasets'][0]['data'].push(counter[item]);
    dataWidget['datasets'][0]['backgroundColor'].push(getRandomColor());
});

textarea.oninput = () => {
    //перебераем буквы в воде и вызываем счетчик при необходимости
    for (let letter of textarea.value) {
        if (symbol.indexOf(letter) > -1) {
            changeCounter(letter);
        }
    }

    setStat();
};

//создаем виджет
let countWidget = new Chart(document.getElementById('statWidget'), {
    type: 'pie',
    data: dataWidget
});