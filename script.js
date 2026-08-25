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

// V2.3：清理仍嵌在文本中的 01 / 02 / 03 等视觉序号。
// 只处理明确的界面标识，不触碰统计数据、年份、尺寸等真实数字。
const numberedMetaSelectors=['.首屏底栏 span:first-child','.页签 button','.小标'];
const stripUiNumbering=(text)=>text
  .replace(/^\s*(?:0[1-9]|10)\s*\/\s*/,'')
  .replace(/^\s*(?:0[1-9]|10)\s+(?=[^\d])/,'')
  .replace(/\s*\/\s*(?:0[1-9]|10)\s*$/,'')
  .trim();

numberedMetaSelectors.forEach(selector=>{
  document.querySelectorAll(selector).forEach(element=>{
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
    const textNodes=[];
    while(walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node=>{ node.nodeValue=stripUiNumbering(node.nodeValue); });
  });
});
