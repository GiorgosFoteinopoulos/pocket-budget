const appName = 'Pocket Budget';
const currency = 'EUR';
let balance = 0;

console.log(appName);
console.log('Starting balance:', balance, currency);

balance = balance + 250;
console.log('After salary:', balance);

balance -= 40;
console.log('After groceries:', balance);

console.log(typeof appName, typeof balance, typeof true);

const message = `${appName}: you have ${balance} ${currency}`;
console.log(message);

document.getElementById('summary').textContent = message;