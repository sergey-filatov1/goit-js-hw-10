import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function addOrderToLog(drink) {
  const item = document.createElement('li');
  item.classList.add('row-pending');
  item.textContent = `${drink} — замовлення прийнято в роботу...`;
  orderLog.prepend(item);

  return item;
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const { drink, state } = form.elements;
  const drinkName = drink.value;
  const shouldResolve = state.value === 'fulfilled';
  const delay = PREP_TIME[drinkName];

  const item = addOrderToLog(drinkName);

  makeOrder(delay, shouldResolve)
    .then(() => {
      item.classList.remove('row-pending');
      item.classList.add('row-ok');
      item.textContent = `${drinkName} — готово ☕`;
    })
    .catch(() => {
      item.classList.remove('row-pending');
      item.classList.add('row-error');
      item.textContent = `${drinkName} — замовлення відхилено`;
    })
    .finally(() => {
      item.textContent += ` | ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
