const btn=document.querySelector('.menu-button');
const nav=document.querySelector('.main-nav');
btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');}));
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.main-nav a[href^="#"]')];
function activeNav(){let current='home';const y=window.scrollY+150;sections.forEach(s=>{if(s.offsetTop<=y) current=s.id;});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));}
window.addEventListener('scroll',activeNav,{passive:true});activeNav();
document.getElementById('year').textContent=new Date().getFullYear();
