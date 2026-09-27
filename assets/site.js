const steps = [...document.querySelectorAll('.flow-step')];
const flowLabel = document.querySelector('#flow-label');
const labels = ['DEMANDA', 'REQUISITO', 'DESENVOLVIMENTO', 'ENTREGA'];
let currentStep = 0;
let rotation;

function showStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => step.setAttribute('aria-pressed', String(stepIndex === index)));
  if (flowLabel) flowLabel.textContent = `${String(index + 1).padStart(2, '0')} / ${labels[index]}`;
}

function startRotation() {
  clearInterval(rotation);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  rotation = setInterval(() => showStep((currentStep + 1) % steps.length), 3000);
}

if (steps.length) {
  showStep(0);
  startRotation();
  steps.forEach(step => step.addEventListener('click', () => {
    showStep(Number(step.dataset.step));
    startRotation();
  }));
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(rotation) : startRotation());
}

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = expanded;
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
