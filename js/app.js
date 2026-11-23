const currency = 'EUR';

// ---------- Data (PB-4) ----------

let transactions = [
    { id: 1, description: 'Salary', amount: 1200, date: '2026-11-01' },
    { id: 2, description: 'Rent', amount: -450, date: '2026-11-02' },
    { id: 3, description: 'Groceries', amount: -62.40, date: '2026-11-05' },
    { id: 4, description: 'Freelance job', amount: 300, date: '2026-11-12' },
    { id: 5, description: 'Electricity bill', amount: -58.90, date: '2026-11-15' },
    { id: 6, description: 'Coffee', amount: -3.20, date: '2026-11-20' }
];
let nextId = 7;

// ---------- Formatting (PB-3) ----------

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

// ---------- Working with the list (PB-4) ----------

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

// ---------- Showing it on the page (PB-5) ----------

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

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete';
    deleteButton.dataset.id = transaction.id;
    deleteButton.textContent = '✕';
    deleteButton.title = 'Delete';
    actionCell.append(deleteButton);

    row.append(dateCell, descriptionCell, amountCell, actionCell);
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
    const visible = visibleTransactions();
    renderTable(visible);
    renderTotals(summarize(transactions));
    document.getElementById('summary').textContent = `Showing ${visible.length} of ${transactions.length} transactions`;
}

// ---------- Adding from the form (PB-6) ----------

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

    transactions.push({ id: nextId, description: description, amount: signedAmount, date: date });
    nextId = nextId + 1;
    renderAll();

    showError('');
    form.reset();
    dateInput.value = date;
    descriptionInput.focus();
}

// ---------- Filter, sort, delete (PB-7) ----------

const filtersBox = document.querySelector('.filters');
let currentFilter = 'all';

function visibleTransactions() {
    let visible = transactions;
    if (currentFilter === 'income') {
        visible = transactions.filter(t => t.amount > 0);
    } else if (currentFilter === 'expense') {
        visible = transactions.filter(t => t.amount < 0);
    }
    return visible.slice().sort((a, b) => b.date.localeCompare(a.date));
}

function handleFilterClick(event) {
    const button = event.target.closest('button[data-filter]');
    if (!button) {
        return;
    }
    currentFilter = button.dataset.filter;
    for (const filterButton of filtersBox.querySelectorAll('button')) {
        filterButton.classList.toggle('active', filterButton === button);
    }
    renderAll();
}

function handleRowClick(event) {
    const button = event.target.closest('button[data-id]');
    if (!button) {
        return;
    }
    const id = Number(button.dataset.id);
    const transaction = transactions.find(t => t.id === id);
    if (confirm(`Delete "${transaction.description}"?`)) {
        transactions = transactions.filter(t => t.id !== id);
        renderAll();
    }
}

// ---------- Start ----------

form.addEventListener('submit', handleSubmit);
filtersBox.addEventListener('click', handleFilterClick);
rowsBody.addEventListener('click', handleRowClick);
renderAll();