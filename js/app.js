const currency = 'EUR';

const transactions = [
    { description: 'Salary', amount: 1200, date: '2026-11-01' },
    { description: 'Rent', amount: -450, date: '2026-11-02' },
    { description: 'Groceries', amount: -62.40, date: '2026-11-05' },
    { description: 'Freelance job', amount: 300, date: '2026-11-12' },
    { description: 'Electricity bill', amount: -58.90, date: '2026-11-15' },
    { description: 'Coffee', amount: -3.20, date: '2026-11-20' }
];

function formatMoney(amount) {
    return `${amount.toFixed(2)} ${currency}`;
}

function formatSigned(amount) {
    if (amount >= 0) {
        return '+' + formatMoney(amount);
    } else {
        return '-' + formatMoney(Math.abs(amount));
    }
}


function summarize(list) {
    let income = 0;
    let expenses = 0;
    for (const transaction of list) {
        if (transaction.amount > 0) {
            income = income + transaction.amount;
        } else {
            expenses = expenses + transaction.amount;
        }
    }
    return { income: income, expenses: expenses, balance: income + expenses };
}

const rowsBody = document.getElementById('transaction-rows');
const incomeLabel = document.getElementById('total-income');
const expensesLabel = document.getElementById('total-expenses');
const balanceLabel = document.getElementById('total-balance');


function createRow(transaction) {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = transaction.date;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = transaction.description;

    const amountCell = document.createElement('td');
    amountCell.textContent = formatSigned(transaction.amount);
    if (transaction.amount >= 0) {
        amountCell.className = 'amount income';
    } else {
        amountCell.className = 'amount expense';
    }

    row.append(dateCell, descriptionCell, amountCell);
    return row;
}

function renderTable(list) {
    rowsBody.replaceChildren();
    for (const transaction of list) {
        rowsBody.append(createRow(transaction));
    }
}

function renderTotals(summary) {
    incomeLabel.textContent = formatMoney(summary.income);
    expensesLabel.textContent = formatMoney(Math.abs(summary.expenses));
    balanceLabel.textContent = formatMoney(summary.balance);

    if (summary.balance < 0) {
        balanceLabel.className = 'value expense';
    } else {
        balanceLabel.className = 'value income';
    }
}

function renderAll() {
    renderTable(transactions);
    renderTotals(summarize(transactions));
    document.getElementById('summary').textContent = `${transactions.length} transactions`;
}


const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const dateInput = document.getElementById('date');
const formError = document.getElementById('form-error');

function showError(text) {
    formError.textContent = text;
}


function handleSubmit(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeSelect.value;
    const date = dateInput.value;

    if (description === '') {
        showError('Please write a description.');
        return;
    }
    if (Number.isNaN(amount) || amount <= 0) {
        showError('Please enter an amount greater than 0.');
        return;
    }
    if (date === '') {
        showError('Please pick a date.');
        return;
    }

    let signedAmount = amount;
    if (type === 'expense') {
        signedAmount = -amount;
    }

    transactions.push({ description: description, amount: signedAmount, date: date });
    renderAll();

    showError('');
    form.reset();
    dateInput.value = date;
    descriptionInput.focus();
}

form.addEventListener('submit', handleSubmit);
renderAll();