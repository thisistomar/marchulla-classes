
const menuBtn = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

menuBtn?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded','false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

function updateActive(){
  let current = 'home';
  const y = window.scrollY + 150;
  sections.forEach(s => {
    if (s.offsetTop <= y) current = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateActive, {passive:true});
updateActive();

document.getElementById('year').textContent = new Date().getFullYear();
