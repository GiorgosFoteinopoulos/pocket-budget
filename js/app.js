const appName = 'Pocket Budget';
const currency = 'EUR';
let balance = 0;

function formatMoney(amount) {
    return `${amount.toFixed(2)} ${currency}`;
}

function describe(amount) {
    if (amount > 0) {
        return 'income';
    } else if (amount < 0) {
        return 'expense';
    } else {
        return 'nothing';
    }
}

const isBig = amount => Math.abs(amount) >= 100;

function addTransaction(amount) {
    balance = balance + amount;
    console.log(`${describe(amount)} of ${formatMoney(Math.abs(amount))} → balance ${formatMoney(balance)}`);
    if (isBig(amount)) {
        console.log('  (a big one!)');
    }
}

function formatSigned(amount) {
    if (amount >= 0) {
        return '+' + formatMoney(amount);
    } else {
        return '-' + formatMoney(Math.abs(amount));
    }
}

addTransaction(250);
addTransaction(-40);
addTransaction(-120);

const message = `${appName}: you have ${formatMoney(balance)}`;
console.log(message);