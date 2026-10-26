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

function addOrderToLog(drink, delay) {
  const item = document.createElement('li');
  item.classList.add('row-pending');
  item.textContent = `☕ ${drink} · у роботі… · ${delay} ms`;
  orderLog.prepend(item);

  return item;
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const drink = formData.get('drink');
  const state = formData.get('state');
  const shouldResolve = state === 'fulfilled';
  const delay = PREP_TIME[drink];

  const item = addOrderToLog(drink, delay);

  makeOrder(delay, shouldResolve)
    .then(() => {
      item.classList.remove('row-pending');
      item.classList.add('row-ok');
      item.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch(() => {
      item.classList.remove('row-pending');
      item.classList.add('row-err');
      item.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      item.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
