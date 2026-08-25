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

// V2.3：清理仍嵌在文本中的视觉序号。
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

// V2.4：在现有“图文内容模块”之后增加多种可复用的 Landing Page 图文排版。
const glassGroup=[...document.querySelectorAll('.组件组')].find(group=>group.querySelector('h3')?.textContent.trim()==='毛玻璃叠层');
if(glassGroup && !document.querySelector('.图文组合组')){
  const layoutGroup=document.createElement('div');
  layoutGroup.className='组件组 显现 图文组合组';
  layoutGroup.innerHTML=`
    <div class="组件组头">
      <h3>图文排版组合</h3>
      <p>同一套设计语言不应只依赖一种“左图右文”结构。以下组合分别适合产品介绍、案例叙事、研究内容、品牌观点和重点能力展示，通过图片比例、文字位置和留白关系形成不同节奏。</p>
      <div class="用途">适用：产品、案例、机构能力、研究成果、品牌故事</div>
    </div>
    <div class="图文组合库">
      <article class="图文组合 图文反向">
        <div class="组合文字">
          <span class="组合标签">文字主导 · 图片辅助</span>
          <h4>先说清楚观点，再让图片提供可信的现场感。</h4>
          <p>当内容本身具有较强解释性时，文字可以占据更稳定的视觉位置。右侧图片承担环境、人物和真实性证明，不必与文字等宽。</p>
          <a class="文字按钮" href="#落地组件">查看完整说明</a>
        </div>
        <figure class="组合主图"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85" alt="团队讨论场景"></figure>
      </article>

      <article class="图文组合 全幅叠文">
        <figure class="全幅背景"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85" alt="现代建筑办公空间"></figure>
        <div class="叠文面板">
          <span class="组合标签">图片主导 · 实色叠文</span>
          <h4>让一张高质量图片成为整个章节的视觉中心。</h4>
          <p>适合品牌故事、案例开场和重点能力展示。文字不需要悬浮成复杂卡片，只需一个低对比实色面板保证阅读。</p>
          <a class="文字按钮" href="#落地组件">阅读案例</a>
        </div>
      </article>

      <article class="图文组合 双图错位">
        <div class="双图区域">
          <figure class="双图大"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85" alt="办公空间"></figure>
          <figure class="双图小"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85" alt="团队协作"></figure>
        </div>
        <div class="双图文字">
          <span class="组合标签">双图错位 · 编辑式叙事</span>
          <h4>用两张不同尺度的图片，表达空间与人的关系。</h4>
          <p>主图建立场景，小图补充细节。适合案例、机构介绍和研究过程，视觉上更接近杂志版面，而不是标准产品卡片。</p>
        </div>
      </article>

      <article class="图文组合 横向带状">
        <div class="带状文字">
          <span class="组合标签">横向带状 · 中等信息密度</span>
          <h4>当页面需要快速推进时，用更扁平的比例保持阅读速度。</h4>
        </div>
        <figure class="带状图片"><img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1600&q=85" alt="会议空间"></figure>
        <div class="带状说明"><p>适合连续展示多个能力点、案例摘要或产品模块。图片高度压低后，章节不会过度占据一屏，同时仍能保留摄影质感。</p><a class="文字按钮" href="#落地组件">了解更多</a></div>
      </article>

      <article class="图文组合 玻璃叠文组合">
        <figure class="玻璃组合背景"><img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=85" alt="明亮办公空间"></figure>
        <div class="玻璃组合文案">
          <span class="组合标签">全幅摄影 · 毛玻璃信息层</span>
          <h4>只有需要保留背景环境时，才使用毛玻璃承载文字。</h4>
          <p>玻璃层没有边框，通过模糊、透明度和阴影与背景分离。按钮使用实色表面，避免与玻璃背景混在一起。</p>
          <button class="玻璃按钮">查看项目案例</button>
        </div>
      </article>
    </div>`;
  glassGroup.parentNode.insertBefore(layoutGroup,glassGroup);
  observer.observe(layoutGroup);
}
