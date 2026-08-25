const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('进入');observer.unobserve(entry.target)}})},{threshold:.10});
document.querySelectorAll('.显现').forEach(el=>observer.observe(el));
document.querySelectorAll('.页签 button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.页签 button').forEach(b=>b.classList.remove('当前'));btn.classList.add('当前')}));
document.querySelectorAll('.问答 .问题').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('展开')));

// V2.1：按钮、行动入口和卡片不使用方向箭头。
// 只处理交互组件，不影响正文里的方向说明或滚动提示。
const directionalArrowPattern=/[↗↘↙↖→←↑↓➜➝➞⟶⟵]/g;
const actionSelectors=['.胶囊按钮','.主按钮','.次按钮','.文字按钮','.玻璃按钮','.信息卡','.小组件'];

actionSelectors.forEach(selector=>{
  document.querySelectorAll(selector).forEach(element=>{
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
    const textNodes=[];
    while(walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node=>{
      node.nodeValue=node.nodeValue.replace(directionalArrowPattern,'').replace(/\s{2,}/g,' ');
    });
  });
});
