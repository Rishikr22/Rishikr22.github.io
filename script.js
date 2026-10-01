const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

document.querySelectorAll('.certificate-card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('flipped'));
});

document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(window.matchMedia('(hover:none)').matches || window.innerWidth<800)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(750px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav-links');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.textContent=open?'✕':'☰';
  menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');
}));
window.addEventListener('resize',()=>{
  if(window.innerWidth>760){nav.classList.remove('open');nav.style.display='';menu.textContent='☰';}
});
