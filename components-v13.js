// V2.9 — 动态 SVG 场景化流程：Iconify SVG + Anime.js
(() => {
  const group=[...document.querySelectorAll('.组件组')].find(item=>item.querySelector('h3')?.textContent.trim()==='流程与工作方式');
  if(!group) return;

  const board=group.querySelector('.流程SVG库,.流程动态库');
  if(!board) return;

  group.classList.add('流程视觉组');
  const desc=group.querySelector('.组件组头 p');
  const usage=group.querySelector('.组件组头 .用途');
  if(desc) desc.textContent='流程不仅说明先后关系，还应让用户看到每一步“正在发生什么”。这一版用具体工作场景承载流程：研究资料、信息结构、设计界面、协作批注、数据验证与发布结果都成为画面主体，SVG 路径只负责辅助说明流向。';
  if(usage) usage.textContent='适用：服务流程、产品研发、研究转化、协作机制、项目实施、持续迭代';

  board.className='流程动态库';
  board.innerHTML=`
    <section class="流程动态场景">
      <div class="流程动态说明">
        <span class="流程类型">端到端工作流</span>
        <h4>从研究输入，到结构、设计与验证，每一步都对应具体工作画面。</h4>
        <p>用户不需要先理解抽象流程符号。资料、页面结构、界面设计和数据结果本身就能说明工作如何推进。</p>
        <span class="流程技术">Iconify SVG · Anime.js 动态路径</span>
      </div>
      <div class="流程场景舞台 全流程舞台">
        <svg class="流程场景连线" viewBox="0 0 960 520" preserveAspectRatio="none" aria-hidden="true">
          <path id="scene-route-a" class="流程场景路径" d="M175 190 C260 190 250 360 390 360 C500 360 500 175 625 175 C740 175 730 365 850 365"/>
          <rect class="流程信号" data-path="scene-route-a" x="-8" y="-4" width="16" height="8"/>
        </svg>
        <div class="场景层">
          <article class="场景单元 研究窗">
            <div class="场景单元头"><span>研究输入</span><span>资料 / 访谈</span></div>
            <div class="场景单元体">
              <span class="场景图标"><iconify-icon icon="solar:document-text-bold-duotone"></iconify-icon></span>
              <h5>先理解真实问题</h5><p>政策、访谈、数据与用户反馈被放在同一研究空间。</p>
              <div class="搜索条"><iconify-icon icon="solar:magnifer-bold-duotone"></iconify-icon><span>正在筛选关键证据</span></div>
              <div class="资料行"><span class="资料块">用户反馈</span><span class="资料块">业务资料</span><span class="资料块">研究结论</span><span class="资料块">需求约束</span></div>
            </div>
          </article>

          <article class="场景单元 结构窗">
            <div class="场景单元头"><span>信息结构</span><span>优先级</span></div>
            <div class="场景单元体">
              <span class="场景图标"><iconify-icon icon="solar:widget-5-bold-duotone"></iconify-icon></span>
              <h5>把信息重新组织</h5><p>从资料堆叠变成可阅读、可行动的页面结构。</p>
              <div class="结构网格"><span></span><span></span><span></span><span></span></div>
            </div>
          </article>

          <article class="场景单元 设计窗">
            <div class="场景单元头"><span>视觉与界面</span><span>Design system</span></div>
            <div class="场景单元体">
              <span class="场景图标 深"><iconify-icon icon="solar:palette-bold-duotone"></iconify-icon></span>
              <h5>形成统一设计语言</h5><p>组件、版式与视觉层级被组合成真实界面。</p>
              <div class="设计预览"><div class="设计侧栏"><span></span><span></span><span></span><span></span></div><div class="设计画布"><b></b><i></i><i></i><i></i></div></div>
            </div>
          </article>

          <article class="场景单元 验证窗">
            <div class="场景单元头"><span>验证结果</span><span>Data</span></div>
            <div class="场景单元体">
              <span class="场景图标"><iconify-icon icon="solar:chart-2-bold-duotone"></iconify-icon></span>
              <h5>用结果继续修正</h5><p>不以“交付完成”为终点，而是让真实数据进入下一轮。</p>
              <div class="验证指标"><span></span><span></span><span></span><span></span></div>
              <div class="验证清单"><span><iconify-icon icon="solar:check-circle-bold-duotone"></iconify-icon>关键任务已验证</span><span><iconify-icon icon="solar:check-circle-bold-duotone"></iconify-icon>问题进入下一轮</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="流程动态场景">
      <div class="流程场景舞台 协同舞台 深场景">
        <svg class="流程场景连线" viewBox="0 0 960 500" preserveAspectRatio="none" aria-hidden="true">
          <path id="scene-route-b" class="流程场景路径" d="M230 105 C325 105 330 230 410 230 M230 220 C325 220 330 230 410 230 M230 335 C325 335 330 230 410 230 M650 230 C735 230 760 330 825 330"/>
          <rect class="流程信号" data-path="scene-route-b" x="-8" y="-4" width="16" height="8"/>
        </svg>
        <div class="场景层">
          <div class="协同角色">
            <div class="角色行"><span class="角色头像"><iconify-icon icon="solar:user-speak-bold-duotone"></iconify-icon></span><div><strong>研究与策略</strong><span>问题、证据与判断</span></div></div>
            <div class="角色行"><span class="角色头像"><iconify-icon icon="solar:palette-round-bold-duotone"></iconify-icon></span><div><strong>设计与内容</strong><span>结构、表达与体验</span></div></div>
            <div class="角色行"><span class="角色头像"><iconify-icon icon="solar:code-square-bold-duotone"></iconify-icon></span><div><strong>产品与开发</strong><span>实现、联调与验证</span></div></div>
          </div>

          <article class="场景单元 共享工作台">
            <div class="场景单元头"><span>共享工作台</span><span>实时协作</span></div>
            <div class="场景单元体">
              <div class="工作台导航"><span></span><span></span><span></span></div>
              <div class="协作画板">
                <div class="协作主区"><strong></strong><i></i><i></i><i></i><i></i></div>
                <div class="协作侧区"><div class="批注块"><iconify-icon icon="solar:chat-round-dots-bold-duotone"></iconify-icon>这里需要补充证据来源</div><div class="批注块"><iconify-icon icon="solar:check-read-bold-duotone"></iconify-icon>结构已通过评审</div><div class="批注块"><iconify-icon icon="solar:settings-minimalistic-bold-duotone"></iconify-icon>同步到组件规范</div></div>
              </div>
            </div>
          </article>

          <article class="场景单元 交付结果">
            <div class="场景单元头"><span>统一交付</span><span>Ready</span></div>
            <div class="场景单元体">
              <span class="场景图标 深"><iconify-icon icon="solar:rocket-2-bold-duotone"></iconify-icon></span>
              <h5>从多人协作收敛到一个结果</h5>
              <div class="交付状态"><iconify-icon icon="solar:verified-check-bold-duotone"></iconify-icon><span>版本通过验证</span></div>
              <div class="结果数值">92%<small>关键任务完成度</small></div>
            </div>
          </article>
        </div>
      </div>
      <div class="流程动态说明">
        <span class="流程类型">多人协同</span>
        <h4>流程不是一个人在走步骤，而是不同专业角色共同推进同一个结果。</h4>
        <p>这里把研究、设计、产品和开发的输入具体化为协作画面，再通过共享工作台收敛为统一交付。</p>
        <span class="流程技术">SVG 图标场景 · 可见区触发动画</span>
      </div>
    </section>

    <section class="流程动态场景">
      <div class="流程动态说明">
        <span class="流程类型">持续迭代闭环</span>
        <h4>用户反馈、分析判断、版本发布和结果回流，共同构成真正的闭环。</h4>
        <p>循环不再画成一个抽象圆环，而是用反馈消息、分析指标、发布页面和回流状态具体说明“下一轮为什么发生”。</p>
        <span class="流程技术">动态指标 · SVG 路径信号 · Reduced motion 兼容</span>
      </div>
      <div class="流程场景舞台 迭代舞台">
        <svg class="流程场景连线" viewBox="0 0 960 520" preserveAspectRatio="none" aria-hidden="true">
          <path id="scene-route-c" class="流程场景路径" d="M180 180 C300 180 300 260 455 260 C610 260 600 180 760 180 C855 180 855 365 745 385 C620 410 495 425 370 410 C260 395 185 330 180 250"/>
          <rect class="流程信号" data-path="scene-route-c" x="-8" y="-4" width="16" height="8"/>
        </svg>
        <div class="场景层">
          <article class="场景单元 反馈窗">
            <div class="场景单元头"><span>真实反馈</span><span>Users</span></div>
            <div class="场景单元体">
              <span class="场景图标"><iconify-icon icon="solar:chat-line-bold-duotone"></iconify-icon></span>
              <h5>问题首先来自真实使用</h5>
              <div class="反馈消息"><div><iconify-icon icon="solar:user-rounded-bold-duotone"></iconify-icon>关键信息不够突出</div><div><iconify-icon icon="solar:user-rounded-bold-duotone"></iconify-icon>操作入口需要更明确</div></div>
            </div>
          </article>

          <article class="场景单元 分析窗">
            <div class="场景单元头"><span>分析判断</span><span>Insight</span></div>
            <div class="场景单元体">
              <span class="场景图标 深"><iconify-icon icon="solar:graph-up-bold-duotone"></iconify-icon></span>
              <h5>把反馈变成可验证判断</h5>
              <div class="分析环"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="底环" cx="50" cy="50" r="40"></circle><circle class="进度环" cx="50" cy="50" r="40"></circle></svg><strong>78%</strong></div>
            </div>
          </article>

          <article class="场景单元 发布窗">
            <div class="场景单元头"><span>版本发布</span><span>Release</span></div>
            <div class="场景单元体">
              <span class="场景图标"><iconify-icon icon="solar:window-frame-bold-duotone"></iconify-icon></span>
              <h5>判断进入真实界面</h5>
              <div class="发布画面"><div class="发布标题"></div><div class="发布行"><span></span><span></span></div><div class="发布按钮"></div></div>
            </div>
          </article>

          <article class="场景单元 回流窗">
            <div class="场景单元体 回流内容"><span class="回流图标"><iconify-icon icon="solar:refresh-circle-bold-duotone"></iconify-icon></span><div><strong>结果重新进入下一轮</strong><p>新数据与新反馈继续修正产品。</p></div></div>
          </article>
        </div>
      </div>
    </section>`;

  const loadScript=(src,key)=>new Promise((resolve,reject)=>{
    if(document.querySelector(`script[data-lib="${key}"]`)) return resolve();
    const s=document.createElement('script');
    s.src=src;s.async=true;s.dataset.lib=key;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
  });

  const prefersReduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const started=new WeakSet();

  const startScene=(scene)=>{
    scene.classList.add('激活');
    if(prefersReduced || started.has(scene) || !window.anime) return;
    started.add(scene);
    window.anime({targets:scene.querySelectorAll('.场景单元,.角色行'),opacity:[0,1],translateY:[18,0],delay:window.anime.stagger(90),duration:760,easing:'easeOutCubic'});
    scene.querySelectorAll('.流程信号[data-path]').forEach(packet=>{
      const id=packet.dataset.path;
      const route=document.getElementById(id);
      if(!route) return;
      const motion=window.anime.path(`#${id}`);
      window.anime({targets:packet,translateX:motion('x'),translateY:motion('y'),rotate:motion('angle'),duration:5200,easing:'linear',loop:true});
    });
  };

  const observeScenes=()=>{
    const scenes=group.querySelectorAll('.流程动态场景');
    if(!('IntersectionObserver' in window)){scenes.forEach(startScene);return;}
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) startScene(entry.target)}),{threshold:.22});
    scenes.forEach(scene=>io.observe(scene));
  };

  Promise.all([
    loadScript('https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js','iconify'),
    loadScript('https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js','anime')
  ]).catch(()=>{}).finally(observeScenes);
})();
