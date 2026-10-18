
const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)')];

const setActive = () => {
  let current = 'home';
  const y = window.scrollY + 150;
  sections.forEach(section => {
    if (section.offsetTop <= y) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActive, {passive:true});
setActive();

document.getElementById('year').textContent = new Date().getFullYear();
