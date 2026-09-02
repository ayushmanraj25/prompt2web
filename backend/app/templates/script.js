// Interactive Logic for Generated Application
let count = 0;

function toggleCounter() {
  count += 1;
  const counterEl = document.getElementById('counter');
  if (counterEl) {
    counterEl.innerText = `${count} ${count === 1 ? 'click' : 'clicks'}`;
  }
}

function handlePrimaryAction() {
  alert('Welcome to your generated Prompt2Web app! Edit your prompt or code to build anything.');
}

// Initial listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('Prompt2Web Live Sandbox loaded successfully with Global CSS.');
});
