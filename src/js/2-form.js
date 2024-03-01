const form = document.querySelector('form');

const keyLk = 'feedback-form-state';

form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();

  const userData = { email, message };

  saveToLS(keyLk, userData);
});

function init(key) {
  const data = loadFromLS(key);
  form.elements.email.value = data?.email || '';
  form.elements.message.value = data?.message || '';
}

init(keyLk);

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = e.target.elements;
  if (!email.value.trim() || !message.value.trim()) {
    return alert('form fields must be filled');
  }
  const userData = { email, message };
  console.log(userData);
  e.target.reset();

  localStorage.removeItem(keyLk);
});
