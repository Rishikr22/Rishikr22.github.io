document.querySelector('.menu').addEventListener('click',()=>{
  const nav=document.querySelector('nav');
  nav.style.display=nav.style.display==='flex'?'none':'flex';
  if(nav.style.display==='flex'){nav.style.position='absolute';nav.style.top='72px';nav.style.left='0';nav.style.right='0';nav.style.padding='20px';nav.style.background='#111417';nav.style.flexDirection='column';nav.style.alignItems='flex-start';}
});
