const cursorGlow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{
  if(cursorGlow){cursorGlow.style.left=e.clientX+'px';cursorGlow.style.top=e.clientY+'px';}
});

const words=['data','patterns','dashboards','insights','solutions'];
let wi=0,ci=0,deleting=false;
const typed=document.getElementById('typed');
function typeLoop(){
  if(!typed)return;
  const word=words[wi];
  if(!deleting){
    typed.textContent=word.slice(0,++ci);
    if(ci===word.length){deleting=true;setTimeout(typeLoop,1200);return;}
  }else{
    typed.textContent=word.slice(0,--ci);
    if(ci===0){deleting=false;wi=(wi+1)%words.length;}
  }
  setTimeout(typeLoop,deleting?55:85);
}
typeLoop();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(window.innerWidth<800)return;
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=((y/r.height)-.5)*-4, ry=((x/r.width)-.5)*4;
    card.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('pointermove',e=>{
    if(window.innerWidth<800)return;
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener('pointerleave',()=>btn.style.transform='');
});

const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('mobile-open');
  nav.style.display=open?'flex':'none';
});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{
  if(window.innerWidth<=760){nav.classList.remove('mobile-open');nav.style.display='none';}
}));
