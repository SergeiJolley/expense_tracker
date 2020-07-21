const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
// const dummyTransactions = [{
//         id: 1,
//         text: 'Flower',
//         amount: -20
//     },
//     {
//         id: 1,
//         text: 'Bike',
//         amount: +60
//     },
//     {
//         id: 1,
//         text: 'Computer',
//         amount: -30
//     },
//     {
//         id: 1,
//         text: 'Burger',
//         amount: +40
//     }
// ];

// let transactions = dummyTransactions;

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount
        )}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}


function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();

form.addEventListener('submit', addTransaction);