const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
menu.addEventListener('click',()=>{
 const open=nav.classList.toggle('open');
 menu.textContent=open?'✕':'☰';
 menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');}));

const lightbox=document.querySelector('.lightbox'),lightboxImg=lightbox.querySelector('img');
document.querySelectorAll('.cert').forEach(card=>{
 card.addEventListener('click',()=>{
   lightboxImg.src=card.dataset.image;
   lightbox.classList.add('open');
   lightbox.setAttribute('aria-hidden','false');
   document.body.style.overflow='hidden';
 });
});
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src='';document.body.style.overflow='';}
document.querySelector('.close-lightbox').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
