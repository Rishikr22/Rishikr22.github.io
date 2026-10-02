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

// Rapid word/scramble animation in the hero.
const wordEl=document.querySelector('.scramble-word');
if(wordEl){
 const words=wordEl.dataset.words.split('|');
 const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 let index=0;
 const scrambleTo=(next)=>{
   const old=wordEl.textContent;
   const max=Math.max(old.length,next.length);
   let frame=0;
   const total=14;
   const timer=setInterval(()=>{
     frame++;
     wordEl.textContent=Array.from({length:max},(_,i)=>{
       if(frame>total-5 && i<next.length) return next[i];
       if(i<next.length && Math.random()>.42) return next[i];
       return chars[Math.floor(Math.random()*chars.length)];
     }).join('');
     if(frame>=total){clearInterval(timer);wordEl.textContent=next;}
   },45);
 };
 setInterval(()=>{index=(index+1)%words.length;scrambleTo(words[index]);},2200);
}

const lightbox=document.querySelector('.lightbox'),lightboxImg=lightbox.querySelector('img');
const certs=[...document.querySelectorAll('.cert')];
certs.forEach(card=>{
 card.addEventListener('click',()=>{
   if(!card.classList.contains('flipped')){
     certs.forEach(c=>c!==card&&c.classList.remove('flipped'));
     card.classList.add('flipped');
     card.setAttribute('aria-label','Open full certificate');
     return;
   }
   lightboxImg.src=card.dataset.image;
   lightboxImg.alt=card.querySelector('img')?.alt||'Certificate';
   lightbox.classList.add('open');
   lightbox.setAttribute('aria-hidden','false');
   document.body.style.overflow='hidden';
 });
});
function closeLightbox(){
 lightbox.classList.remove('open');
 lightbox.setAttribute('aria-hidden','true');
 lightboxImg.src='';
 document.body.style.overflow='';
 certs.forEach(c=>c.classList.remove('flipped'));
}

document.querySelector('.close-lightbox').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
