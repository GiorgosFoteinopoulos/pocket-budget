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

function countExpenses(list) {
    let count = 0;
    for (const transaction of list) {
        if (transaction.amount < 0) {
            count = count + 1;
        }
    }
    return count;
}

transactions.push({ description: 'Coffee', amount: -3.20, date: '2026-11-20' });

printTransactions(transactions);

const summary = summarize(transactions);
console.log('Income: ', formatMoney(summary.income));
console.log('Expenses:', formatMoney(summary.expenses));
console.log('Balance: ', formatMoney(summary.balance));

const message = `${appName}: ${transactions.length} transactions, balance ${formatMoney(summary.balance)}`;
console.log(message);

document.getElementById('summary').textContent = message;