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

// V2.5：把原“图文内容模块”与多种图文排版合并为同一个图文内容库。
const imageContentGroup=[...document.querySelectorAll('.组件组')].find(group=>group.querySelector('h3')?.textContent.trim()==='图文内容模块');
if(imageContentGroup && !imageContentGroup.querySelector('.图文组合库')){
  imageContentGroup.classList.add('图文内容库组');
  const groupTitle=imageContentGroup.querySelector('.组件组头 h3');
  const groupDesc=imageContentGroup.querySelector('.组件组头 p');
  const groupUsage=imageContentGroup.querySelector('.组件组头 .用途');
  if(groupTitle) groupTitle.textContent='图文内容库';
  if(groupDesc) groupDesc.textContent='图文是 Landing Page 最重要的中段表达方式之一。内容库同时提供基础 7/5 图文、文字主导、全幅叠文、双图错位、横向带状与毛玻璃叠文等结构，可根据内容密度和叙事节奏选择，而不是让整页重复同一种左右分栏。';
  if(groupUsage) groupUsage.textContent='适用：产品介绍、案例叙事、机构能力、研究成果、品牌故事';

  const library=document.createElement('div');
  library.className='图文组合库';
  library.innerHTML=`
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
    </article>`;

  const baseLayout=imageContentGroup.querySelector('.图文板');
  if(baseLayout) baseLayout.insertAdjacentElement('afterend',library);
  else imageContentGroup.appendChild(library);
}

// V2.7：将“流程与工作方式”的步骤卡片替换为多组内联 SVG 流程图。
const processGroup=[...document.querySelectorAll('.组件组')].find(group=>group.querySelector('h3')?.textContent.trim()==='流程与工作方式');
if(processGroup){
  processGroup.classList.add('流程视觉组');
  const desc=processGroup.querySelector('.组件组头 p');
  const usage=processGroup.querySelector('.组件组头 .用途');
  if(desc) desc.textContent='流程不再用四张卡片罗列步骤，而是通过路径、节点、分支、循环和阶段关系直接表现工作方式。不同结构分别适合线性推进、方案分流、持续迭代和成熟度演进。';
  if(usage) usage.textContent='适用：服务流程、项目实施、决策路径、迭代机制、阶段规划';

  const stepsBoard=processGroup.querySelector('.步骤板');
  if(stepsBoard){
    stepsBoard.className='流程SVG库';
    stepsBoard.innerHTML=`
      <section class="流程SVG组 流程线性">
        <div class="流程说明"><span class="流程类型">线性推进</span><h4>把连续步骤放在一条清晰路径上。</h4><p>适合没有复杂分支的实施流程，让用户一眼看到从问题理解到持续优化的推进关系。</p></div>
        <div class="流程画布">
          <svg viewBox="0 0 920 260" role="img" aria-labelledby="flow-linear-title">
            <title id="flow-linear-title">线性推进流程</title>
            <defs><marker id="flowArrowLinear" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="流程箭头" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
            <path class="流程辅线" d="M110 126 H810"/>
            <path class="流程主线" marker-end="url(#flowArrowLinear)" d="M135 126 H305"/>
            <path class="流程主线" marker-end="url(#flowArrowLinear)" d="M365 126 H535"/>
            <path class="流程主线" marker-end="url(#flowArrowLinear)" d="M595 126 H765"/>
            <circle class="流程节点实" cx="110" cy="126" r="14"/><circle class="流程节点" cx="340" cy="126" r="14"/><circle class="流程节点" cx="570" cy="126" r="14"/><circle class="流程节点实" cx="800" cy="126" r="14"/>
            <text class="流程标签" x="110" y="178" text-anchor="middle">理解问题</text><text class="流程注释" x="110" y="200" text-anchor="middle">目标与现状</text>
            <text class="流程标签" x="340" y="178" text-anchor="middle">建立结构</text><text class="流程注释" x="340" y="200" text-anchor="middle">信息与优先级</text>
            <text class="流程标签" x="570" y="178" text-anchor="middle">形成系统</text><text class="流程注释" x="570" y="200" text-anchor="middle">视觉与组件</text>
            <text class="流程标签" x="800" y="178" text-anchor="middle">持续优化</text><text class="流程注释" x="800" y="200" text-anchor="middle">验证与迭代</text>
          </svg>
        </div>
      </section>

      <section class="流程SVG组 流程分支">
        <div class="流程说明"><span class="流程类型">分支与汇合</span><h4>同一个目标，可以经过不同专业路径再重新汇合。</h4><p>适合展示策略与设计、内容与产品等并行工作如何从共同目标出发，最终形成统一交付。</p></div>
        <div class="流程画布">
          <svg viewBox="0 0 920 360" role="img" aria-labelledby="flow-branch-title">
            <title id="flow-branch-title">分支汇合流程</title>
            <defs><marker id="flowArrowBranch" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="流程箭头" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
            <path class="流程主线" d="M125 180 H270"/>
            <path class="流程主线" marker-end="url(#flowArrowBranch)" d="M270 180 C330 180 330 90 420 90"/>
            <path class="流程主线" marker-end="url(#flowArrowBranch)" d="M270 180 C330 180 330 270 420 270"/>
            <path class="流程主线" d="M455 90 C580 90 575 180 660 180"/>
            <path class="流程主线" d="M455 270 C580 270 575 180 660 180"/>
            <path class="流程主线" marker-end="url(#flowArrowBranch)" d="M690 180 H805"/>
            <circle class="流程节点实" cx="105" cy="180" r="14"/><circle class="流程节点浅" cx="440" cy="90" r="15"/><circle class="流程节点浅" cx="440" cy="270" r="15"/><circle class="流程节点" cx="675" cy="180" r="15"/><circle class="流程节点实" cx="830" cy="180" r="14"/>
            <text class="流程标签" x="105" y="225" text-anchor="middle">目标确认</text>
            <text class="流程标签" x="440" y="58" text-anchor="middle">信息结构</text><text class="流程注释" x="440" y="115" text-anchor="middle">内容与逻辑</text>
            <text class="流程标签" x="440" y="320" text-anchor="middle">视觉表达</text><text class="流程注释" x="440" y="295" text-anchor="middle">界面与体验</text>
            <text class="流程标签" x="675" y="225" text-anchor="middle">系统整合</text>
            <text class="流程标签" x="830" y="225" text-anchor="middle">验证交付</text>
          </svg>
        </div>
      </section>

      <section class="流程SVG组 流程循环">
        <div class="流程说明"><span class="流程类型">循环迭代</span><h4>不是走完一次，而是让反馈重新进入下一轮。</h4><p>适合产品、内容和运营类工作，用闭环表达观察、判断、执行和反馈之间持续发生的关系。</p></div>
        <div class="流程画布">
          <svg viewBox="0 0 720 500" role="img" aria-labelledby="flow-cycle-title">
            <title id="flow-cycle-title">循环迭代流程</title>
            <defs><marker id="flowArrowCycle" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="流程箭头" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
            <path class="流程主线" marker-end="url(#flowArrowCycle)" d="M360 88 A162 162 0 0 1 522 250"/>
            <path class="流程主线" marker-end="url(#flowArrowCycle)" d="M522 250 A162 162 0 0 1 360 412"/>
            <path class="流程主线" marker-end="url(#flowArrowCycle)" d="M360 412 A162 162 0 0 1 198 250"/>
            <path class="流程主线" marker-end="url(#flowArrowCycle)" d="M198 250 A162 162 0 0 1 360 88"/>
            <circle class="流程节点实" cx="360" cy="88" r="14"/><circle class="流程节点" cx="522" cy="250" r="14"/><circle class="流程节点" cx="360" cy="412" r="14"/><circle class="流程节点" cx="198" cy="250" r="14"/><circle class="流程中心" cx="360" cy="250" r="5"/>
            <path class="流程虚线" d="M360 112 V226 M498 250 H384 M360 388 V274 M222 250 H336"/>
            <text class="流程标签" x="360" y="54" text-anchor="middle">观察输入</text><text class="流程注释" x="360" y="135" text-anchor="middle">真实问题</text>
            <text class="流程标签" x="582" y="255">形成判断</text><text class="流程注释" x="582" y="277">策略假设</text>
            <text class="流程标签" x="360" y="462" text-anchor="middle">执行验证</text><text class="流程注释" x="360" y="382" text-anchor="middle">形成方案</text>
            <text class="流程标签" x="138" y="255" text-anchor="end">反馈修正</text><text class="流程注释" x="138" y="277" text-anchor="end">数据与体验</text>
            <text class="流程注释" x="360" y="254" text-anchor="middle">持续迭代</text>
          </svg>
        </div>
      </section>

      <section class="流程SVG组 流程阶段">
        <div class="流程说明"><span class="流程类型">阶段递进</span><h4>用阶梯关系表达能力逐层成熟，而不是平铺步骤。</h4><p>适合长期项目和复杂实施计划，强调后一阶段建立在前一阶段成果之上，并持续向更高完成度推进。</p></div>
        <div class="流程画布">
          <svg viewBox="0 0 920 380" role="img" aria-labelledby="flow-stage-title">
            <title id="flow-stage-title">阶段递进流程</title>
            <defs><marker id="flowArrowStage" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="流程箭头" d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
            <path class="流程辅线" d="M70 315 H225 V255 H390 V195 H555 V135 H720 V75 H845"/>
            <path class="流程主线" marker-end="url(#flowArrowStage)" d="M70 315 H225 V255 H390 V195 H555 V135 H720 V75 H845"/>
            <circle class="流程节点实" cx="95" cy="315" r="12"/><circle class="流程节点" cx="225" cy="255" r="12"/><circle class="流程节点" cx="390" cy="195" r="12"/><circle class="流程节点" cx="555" cy="135" r="12"/><circle class="流程节点实" cx="720" cy="75" r="12"/>
            <text class="流程标签" x="95" y="350" text-anchor="middle">内容理解</text><text class="流程注释" x="95" y="370" text-anchor="middle">明确问题</text>
            <text class="流程标签" x="225" y="228" text-anchor="middle">信息结构</text><text class="流程注释" x="225" y="278" text-anchor="middle">建立秩序</text>
            <text class="流程标签" x="390" y="168" text-anchor="middle">视觉系统</text><text class="流程注释" x="390" y="218" text-anchor="middle">形成规范</text>
            <text class="流程标签" x="555" y="108" text-anchor="middle">交互验证</text><text class="流程注释" x="555" y="158" text-anchor="middle">真实使用</text>
            <text class="流程标签" x="720" y="48" text-anchor="middle">持续迭代</text><text class="流程注释" x="720" y="98" text-anchor="middle">长期优化</text>
          </svg>
        </div>
      </section>`;
  }
}
