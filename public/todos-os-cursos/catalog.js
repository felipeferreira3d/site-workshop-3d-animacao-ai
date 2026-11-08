if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending-reveal');observer.unobserve(entry.target)}}),{threshold:0.08});
  document.querySelectorAll('.course-card,.combo-box').forEach(el=>{el.classList.add('reveal','pending-reveal');observer.observe(el)});
}
