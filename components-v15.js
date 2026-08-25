// V2.11 — 重新梳理设计系统层级：大模块 → 小标题 → 具体组件
(() => {
  const page=document.querySelector('.页面');
  const hero=document.querySelector('.首屏');
  if(!page || !hero || document.querySelector('.系统模块')) return;

  const moduleConfig=[
    {
      id:'模块-设计基础', title:'设计基础', theme:'模块默认',
      desc:'先建立整套页面共同遵循的视觉规则，包括设计原则、色彩、字体与栅格间距。这里定义的是所有后续组件的基础语言。'
    },
    {
      id:'模块-基础组件', title:'基础组件', theme:'模块浅色',
      desc:'集中管理最常使用的基础界面元素，包括界面语言、按钮、标签与卡片，让不同页面使用同一套交互与视觉表达。'
    },
    {
      id:'模块-数据图表', title:'数据图表', theme:'模块雾色',
      desc:'把数据表达统一归入同一个模块。数据卡片负责快速建立认知，图表负责解释趋势、比较、结构和复杂指标关系。'
    },
    {
      id:'模块-内容媒体', title:'内容与媒体', theme:'模块默认',
      desc:'管理图文、新闻、文章、案例、图片和观点类内容的版式，让长页面在不同信息密度之间保持连续而有变化的阅读节奏。'
    },
    {
      id:'模块-流程交互', title:'流程与交互', theme:'模块浅色',
      desc:'集中表现流程、协作、反馈和用户操作，包括动态工作流程、联系表单、常见问题与动效规则。'
    },
    {
      id:'模块-页面结构', title:'页面结构', theme:'模块雾色',
      desc:'用于把前面的视觉与组件组织成完整页面，包括页面蓝图、页脚和开发实现令牌，明确最终落地时的结构关系。'
    }
  ];

  const moduleTargets={};
  const fragment=document.createDocumentFragment();
  moduleConfig.forEach(config=>{
    const section=document.createElement('section');
    section.className=`章节 系统模块 ${config.theme}`;
    section.id=config.id;
    section.innerHTML=`<div class="容器"><header class="系统模块头"><h2 class="系统模块标题">${config.title}</h2><p class="系统模块说明">${config.desc}</p></header><div class="系统模块内容"></div></div>`;
    moduleTargets[config.id]=section.querySelector('.系统模块内容');
    fragment.appendChild(section);
  });

  const firstLegacy=[...page.children].find(el=>el.classList?.contains('章节'));
  page.insertBefore(fragment,firstLegacy || null);

  const headingText=(node)=>node?.textContent?.trim() || '';
  const findLegacySection=(title)=>[...document.querySelectorAll('.章节:not(.系统模块)')].find(section=>headingText(section.querySelector('.章节标题'))===title);
  const findGroup=(aliases)=>{
    const names=Array.isArray(aliases)?aliases:[aliases];
    return [...document.querySelectorAll('.组件组')].find(group=>names.includes(headingText(group.querySelector('.组件组头 h3'))));
  };

  const normalizeInnerHeadings=(group)=>{
    group.querySelectorAll('h3').forEach(h3=>{
      if(h3.closest('.组件组头')) return;
      const h4=document.createElement('h4');
      [...h3.attributes].forEach(attr=>h4.setAttribute(attr.name,attr.value));
      h4.innerHTML=h3.innerHTML;
      h3.replaceWith(h4);
    });
  };

  const makeStaticGroup=(sourceTitle,newTitle,moduleId,extraClass='')=>{
    const source=findLegacySection(sourceTitle);
    if(!source) return null;
    const container=source.querySelector('.容器');
    const oldHead=source.querySelector('.章节头');
    const desc=headingText(oldHead?.querySelector('.章节说明'));
    const group=document.createElement('div');
    group.className=`组件组 系统小模块 显现 ${extraClass}`.trim();
    group.dataset.sourceTitle=sourceTitle;
    group.innerHTML=`<div class="组件组头"><h3>${newTitle}</h3>${desc?`<p>${desc}</p>`:''}</div>`;
    [...container.children].forEach(child=>{if(child!==oldHead) group.appendChild(child)});
    normalizeInnerHeadings(group);
    moduleTargets[moduleId]?.appendChild(group);
    source.remove();
    if(typeof observer!=='undefined') observer.observe(group);
    return group;
  };

  const moveExistingGroup=(aliases,newTitle,moduleId,extraClass='')=>{
    const group=findGroup(aliases);
    if(!group) return null;
    const title=group.querySelector('.组件组头 h3');
    if(title) title.textContent=newTitle;
    group.classList.add('系统小模块');
    if(extraClass) group.classList.add(extraClass);
    normalizeInnerHeadings(group);
    moduleTargets[moduleId]?.appendChild(group);
    return group;
  };

  // 设计基础
  makeStaticGroup('核心设计原则','设计原则','模块-设计基础','设计原则组');
  makeStaticGroup('角色化色彩系统','色彩系统','模块-设计基础','色彩系统组');
  makeStaticGroup('中文字体与文本样式','字体样式','模块-设计基础','字体样式组');
  makeStaticGroup('栅格与间距','栅格与间距','模块-设计基础','栅格间距组');

  // 基础组件
  makeStaticGroup('基础界面语言','界面语言','模块-基础组件','界面语言组');
  moveExistingGroup('按钮与行动入口','按钮与行动入口','模块-基础组件');
  moveExistingGroup('标签与元信息','标签与元信息','模块-基础组件');
  moveExistingGroup('价值与服务卡片','卡片','模块-基础组件');

  // 数据图表
  moveExistingGroup('关键数据','数据卡片','模块-数据图表','数据卡片组');

  // 内容与媒体
  moveExistingGroup(['图文内容库','图文内容模块'],'图文内容','模块-内容媒体','图文内容库组');
  moveExistingGroup('毛玻璃叠层','毛玻璃叠层','模块-内容媒体');
  moveExistingGroup('观点与引语','观点与引语','模块-内容媒体');
  makeStaticGroup('摄影与图片方向','摄影与图片','模块-内容媒体','摄影图片组');

  // 流程与交互
  moveExistingGroup('流程与工作方式','流程与工作方式','模块-流程交互','流程视觉组');
  moveExistingGroup('联系与表单','联系与表单','模块-流程交互');
  moveExistingGroup('常见问题','常见问题','模块-流程交互');
  makeStaticGroup('动效语言','动效语言','模块-流程交互','动效语言组');

  // 页面结构
  makeStaticGroup('落地页 页面蓝图','页面蓝图','模块-页面结构','页面蓝图组');
  moveExistingGroup('页脚','页脚','模块-页面结构');
  makeStaticGroup('开发实现令牌','开发实现令牌','模块-页面结构','开发令牌组');

  // 原“落地页组件”大章节在组件被重新归类后不再保留。
  const landing=findLegacySection('落地页 组件规范');
  if(landing){
    const remaining=[...landing.querySelectorAll('.组件组')];
    remaining.forEach(group=>{
      // 未匹配的新组件先归入最接近的“基础组件”，避免内容丢失。
      group.classList.add('系统小模块');
      moduleTargets['模块-基础组件'].appendChild(group);
    });
    landing.remove();
  }

  const relocateDynamicGroups=()=>{
    const chart=moveExistingGroup('数据图表组件','图表组件','模块-数据图表','图表组件组');
    const content=moveExistingGroup('新闻、文章与案例','新闻、文章与案例','模块-内容媒体','内容发布组');
    const process=findGroup('流程与工作方式');
    if(process && process.parentElement!==moduleTargets['模块-流程交互']) moduleTargets['模块-流程交互'].prepend(process);
    if(chart) normalizeInnerHeadings(chart);
    if(content) normalizeInnerHeadings(content);
  };
  relocateDynamicGroups();

  // 统一模块内顺序，动态组件晚加载时也能回到正确位置。
  const desiredOrder={
    '模块-设计基础':['设计原则','色彩系统','字体样式','栅格与间距'],
    '模块-基础组件':['界面语言','按钮与行动入口','标签与元信息','卡片'],
    '模块-数据图表':['数据卡片','图表组件'],
    '模块-内容媒体':['图文内容','新闻、文章与案例','毛玻璃叠层','观点与引语','摄影与图片'],
    '模块-流程交互':['流程与工作方式','联系与表单','常见问题','动效语言'],
    '模块-页面结构':['页面蓝图','页脚','开发实现令牌']
  };
  const reorder=()=>{
    Object.entries(desiredOrder).forEach(([moduleId,names])=>{
      const target=moduleTargets[moduleId];
      if(!target) return;
      names.forEach(name=>{
        const group=[...document.querySelectorAll('.系统小模块')].find(item=>headingText(item.querySelector('.组件组头 h3'))===name);
        if(group) target.appendChild(group);
      });
    });
  };
  reorder();

  // 顶部导航只定位到一级大模块。
  const nav=document.querySelector('.导航');
  const navItems=[
    ['设计基础','#模块-设计基础'],['基础组件','#模块-基础组件'],['数据图表','#模块-数据图表'],
    ['内容与媒体','#模块-内容媒体'],['流程与交互','#模块-流程交互'],['页面结构','#模块-页面结构']
  ];
  if(nav){
    nav.dataset.moduleNav='hierarchy';
    nav.setAttribute('aria-label','设计系统一级模块导航');
    nav.innerHTML=navItems.map(([label,href])=>`<a href="${href}">${label}</a>`).join('');
  }
  const topNote=document.querySelector('.顶部说明');
  if(topNote) topNote.textContent='设计系统 · 组件库';

  // 修正页面中仍指向旧章节的锚点。
  const anchorRedirect={
    '#原则':'#模块-设计基础','#色彩':'#模块-设计基础','#字体':'#模块-设计基础','#栅格':'#模块-设计基础',
    '#基础组件':'#模块-基础组件','#落地组件':'#模块-基础组件','#模块-数据':'#模块-数据图表','#模块-图表':'#模块-数据图表',
    '#模块-图文':'#模块-内容媒体','#模块-内容':'#模块-内容媒体','#模块-流程':'#模块-流程交互','#模块-表单':'#模块-流程交互',
    '#动效':'#模块-流程交互','#蓝图':'#模块-页面结构','#令牌':'#模块-页面结构'
  };
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    const href=link.getAttribute('href');
    if(anchorRedirect[href]) link.setAttribute('href',anchorRedirect[href]);
  });

  // 一级模块滚动定位状态。
  let spy;
  const setupSpy=()=>{
    spy?.disconnect?.();
    const links=[...document.querySelectorAll('.导航 a')];
    const targets=moduleConfig.map(item=>document.getElementById(item.id)).filter(Boolean);
    if(!('IntersectionObserver' in window)) return;
    spy=new IntersectionObserver(entries=>{
      const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!active) return;
      links.forEach(link=>link.classList.toggle('当前模块',link.getAttribute('href')===`#${active.target.id}`));
    },{rootMargin:'-20% 0px -62% 0px',threshold:[0,.12,.3,.55]});
    targets.forEach(target=>spy.observe(target));
  };
  setupSpy();

  let mutationTimer;
  const mo=new MutationObserver(()=>{
    clearTimeout(mutationTimer);
    mutationTimer=setTimeout(()=>{
      relocateDynamicGroups();
      reorder();
    },90);
  });
  mo.observe(page,{childList:true,subtree:true});
})();
