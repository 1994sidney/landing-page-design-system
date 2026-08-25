const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('进入');observer.unobserve(entry.target)}})},{threshold:.10});
document.querySelectorAll('.显现').forEach(el=>observer.observe(el));
document.querySelectorAll('.页签 button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.页签 button').forEach(b=>b.classList.remove('当前'));btn.classList.add('当前')}));
document.querySelectorAll('.问答 .问题').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('展开')));
