function onReady(){
  const features = Array.from(document.querySelectorAll('.feature'));
  const hero = document.querySelector('.hero-content');

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      if(el.classList.contains('feature')){
        revealFeature(el);
      } else if(el === hero){
        revealHero();
      }
      io.unobserve(el);
    });
  },{threshold:0.18});

  features.forEach(f=>io.observe(f));
  if(hero) io.observe(hero);

  document.querySelectorAll('.feature-media').forEach(container=>{
    const img = container.querySelector('img');
    if(!img) return;
    let entered = false;
    container.addEventListener('pointermove', e=>{
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 8;
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    container.addEventListener('pointerleave', ()=>{
      img.style.transform = '';
    });
    container.addEventListener('pointerenter', ()=>{
      img.style.transition = 'transform .35s cubic-bezier(.2,.9,.2,1)';
    });
  });

  let latestScroll = 0; let ticking = false;
  const heroHeader = document.querySelector('.hero-header');
  window.addEventListener('scroll', ()=>{
    latestScroll = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(()=>{
        const sc = latestScroll;
        if(heroHeader){
          heroHeader.style.backgroundPosition = `center ${-sc * 0.12}px`;
        }
        if(hero){
          hero.style.transform = `translateY(${Math.min(sc * 0.05, 30)}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  },{passive:true});
}

function revealFeature(el){
  if(el.dataset.revealed) return;
  el.dataset.revealed = '1';
  const text = el.querySelector('.feature-text');
  const img = el.querySelector('.feature-media img');

  if(img){
    img.animate([
      {transform:'translateY(28px) scale(.98)', filter:'brightness(.94)'},
      {transform:'translateY(0) scale(1)', filter:'brightness(1)'}
    ],{duration:850,easing:'cubic-bezier(.2,.9,.2,1)',fill:'forwards'});
  }

  if(text){
    text.animate([
      {opacity:0, transform:'translateY(22px)'},
      {opacity:1, transform:'translateY(0)'}
    ],{duration:700,easing:'cubic-bezier(.2,.9,.2,1)',fill:'forwards',delay:120});
  }

  const extras = el.querySelectorAll('.feature-text > *:not(h2)');
  extras.forEach((node,i)=>{
    node.animate([
      {opacity:0, transform:'translateY(10px)'},
      {opacity:1, transform:'translateY(0)'}
    ],{duration:480,easing:'ease-out',fill:'forwards',delay:220 + i*60});
  });

  el.classList.add('reveal');
}

function revealHero(){
  const hero = document.querySelector('.hero-content');
  if(!hero || hero.dataset.revealed) return;
  hero.dataset.revealed = '1';
  hero.animate([
    {opacity:0, transform:'translateY(10px)'},
    {opacity:1, transform:'translateY(0)'}
  ],{duration:700,easing:'cubic-bezier(.2,.9,.2,1)',fill:'forwards'});
  hero.classList.add('reveal');
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', onReady);
} else onReady();
