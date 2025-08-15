document.addEventListener('DOMContentLoaded', function () {
  // Fade slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let si = 0;
  function show(i){
    slides.forEach((s,idx)=>{
      s.classList.toggle('slide-show', idx===i);
      s.classList.toggle('slide-hidden', idx!==i);
    });
    dots.forEach((d,idx)=> d.classList.toggle('bg-white', idx!==i) || d.classList.toggle('bg-blue-600', idx===i));
    si = i;
  }
  if(slides.length){
    show(0);
    let autoplay = setInterval(()=> show((si+1)%slides.length),4000);
    // dots click
    dots.forEach((d,idx)=> d.addEventListener('click', ()=> show(idx)));
    // pause on hover
    const hero = document.querySelector('#hero');
    hero && hero.addEventListener('mouseenter', ()=> clearInterval(autoplay));
    hero && hero.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> show((si+1)%slides.length),4000));
  }

  // counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(c=>{
    const target = +c.dataset.target || 0;
    let count = 0;
    const step = Math.max(1, Math.floor(target/150));
    const upd = ()=>{
      count += step;
      if(count >= target) { c.textContent = target; } else { c.textContent = count; setTimeout(upd, 20); }
    };
    upd();
  });

  // scroll reveal
  const observers = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs)=> {
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, {threshold:0.2});
  observers.forEach(o=> io.observe(o));
});
