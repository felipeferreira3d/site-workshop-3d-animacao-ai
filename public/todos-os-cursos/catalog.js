if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending-reveal');observer.unobserve(entry.target)}}),{threshold:0.08});
  document.querySelectorAll('.course-card,.combo-box').forEach(el=>{el.classList.add('reveal','pending-reveal');observer.observe(el)});
}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(pointer: fine)').matches){
  document.querySelectorAll('.course-card').forEach(card=>card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    card.style.setProperty('--pointer-x',`${event.clientX-rect.left}px`);
    card.style.setProperty('--pointer-y',`${event.clientY-rect.top}px`);
  }));
}
