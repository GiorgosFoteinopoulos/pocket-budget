const appName = 'Pocket Budget';
const currency = 'EUR';

const transactions = [
    { description: 'Salary', amount: 1200, date: '2026-11-01' },
    { description: 'Rent', amount: -450, date: '2026-11-02' },
    { description: 'Groceries', amount: -62.40, date: '2026-11-05' },
    { description: 'Freelance job', amount: 300, date: '2026-11-12' },
    { description: 'Electricity bill', amount: -58.90, date: '2026-11-15' }
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

function printTransactions(list) {
    for (const transaction of list) {
        console.log(`${transaction.date} ${transaction.description.padEnd(18)} ${formatSigned(transaction.amount)}`);
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
}

transactions.push({ description: 'Coffee', amount: -3.20, date: '2026-11-20'  });

renderTable(transactions);
renderTotals(summarize(transactions));

document.getElementById('summary').textContent = `${transactions.length} transactions in November`;

