// V2.10 — 模块导航与统一锚点
(() => {
  const byHeading=(selector,text)=>[...document.querySelectorAll(selector)].find(el=>el.textContent.trim()===text);

  const assignStaticIds=()=>{
    const gridTitle=byHeading('.章节标题','栅格与间距');
    const photoTitle=byHeading('.章节标题','摄影与图片方向');
    if(gridTitle) gridTitle.closest('.章节')?.setAttribute('id','栅格');
    if(photoTitle) photoTitle.closest('.章节')?.setAttribute('id','摄影');
  };

  const groupMap={
    '关键数据':'模块-数据',
    '数据图表组件':'模块-图表',
    '图文内容库':'模块-图文',
    '新闻、文章与案例':'模块-内容',
    '流程与工作方式':'模块-流程',
    '联系与表单':'模块-表单'
  };

  const assignGroupIds=()=>{
    document.querySelectorAll('.组件组').forEach(group=>{
      const title=group.querySelector('.组件组头 h3')?.textContent.trim();
      if(title && groupMap[title]) group.id=groupMap[title];
    });
  };

  const navItems=[
    ['设计基础','#原则'],
    ['基础界面','#基础组件'],
    ['数据','#模块-数据'],
    ['图表','#模块-图表'],
    ['图文','#模块-图文'],
    ['内容','#模块-内容'],
    ['流程','#模块-流程'],
    ['表单','#模块-表单'],
    ['页面规范','#蓝图']
  ];

  const renderNav=()=>{
    const nav=document.querySelector('.导航');
    if(!nav || nav.dataset.moduleNav==='true') return;
    nav.dataset.moduleNav='true';
    nav.setAttribute('aria-label','设计系统模块导航');
    nav.innerHTML=navItems.map(([label,href])=>`<a href="${href}">${label}</a>`).join('');
    const note=document.querySelector('.顶部说明');
    if(note) note.textContent='模块导航 · 设计系统';
  };

  let spy;
  const setupScrollSpy=()=>{
    spy?.disconnect?.();
    const links=[...document.querySelectorAll('.导航 a')];
    const targets=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if(!targets.length || !('IntersectionObserver' in window)) return;
    spy=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible) return;
      links.forEach(link=>link.classList.toggle('当前模块',link.getAttribute('href')===`#${visible.target.id}`));
    },{rootMargin:'-22% 0px -58% 0px',threshold:[0,.15,.35,.6]});
    targets.forEach(target=>spy.observe(target));
  };

  const init=()=>{
    assignStaticIds();
    assignGroupIds();
    renderNav();
    setupScrollSpy();
  };

  init();
  let timer;
  const mo=new MutationObserver(()=>{
    clearTimeout(timer);
    timer=setTimeout(()=>{assignGroupIds();setupScrollSpy();},80);
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();
