// V2.8 — ECharts 图表组件 + 新闻 / 文章 / 案例组件
(() => {
  const findGroup = (title) => [...document.querySelectorAll('.组件组')].find(group => group.querySelector('h3')?.textContent.trim() === title);

  /* ==================== 图表组件 ==================== */
  const dataGroup = findGroup('关键数据');
  if (dataGroup && !document.querySelector('.图表组件组')) {
    const chartGroup = document.createElement('div');
    chartGroup.className = '组件组 显现 图表组件组';
    chartGroup.innerHTML = `
      <div class="组件组头">
        <h3>数据图表组件</h3>
        <p>图表用于解释趋势、比较、构成与多指标关系。统一使用 ECharts 渲染，视觉上延续当前的雾蓝灰体系：坐标轴和辅助线保持低对比，渐变只用于数据面积、柱体等真正需要强调的部分。</p>
        <div class="用途">适用：趋势、排名、构成、业务分析、复杂指标对比</div>
      </div>
      <div class="图表库">
        <section class="图表模块">
          <div class="图表抬头"><div><span class="图表类型">折线趋势</span><h4>趋势变化与阶段走势</h4><p>适合连续时间序列。面积渐变只用于辅助阅读，折线本身保持清晰。</p></div><span class="图表标记">ECharts · 示例数据</span></div>
          <div class="EChart画布" id="chart-line"></div>
          <div class="图表说明条"><span>建议：6–12 个时间节点</span><span>重点表达变化而不是单点大小</span></div>
        </section>

        <section class="图表模块">
          <div class="图表抬头"><div><span class="图表类型">横向条形</span><h4>分类排名与能力比较</h4><p>类别名称较长时优先使用横向条形，比纵向柱状更适合中文标签。</p></div><span class="图表标记">ECharts · 示例数据</span></div>
          <div class="EChart画布" id="chart-bar"></div>
          <div class="图表说明条"><span>建议：5–8 个分类</span><span>由高到低排序更易理解</span></div>
        </section>

        <section class="图表模块 结构图">
          <div class="图表抬头"><div><span class="图表类型">结构构成</span><h4>整体结构与比例关系</h4><p>适合少量类别的组成分析，类别过多时应切换为条形图。</p></div><span class="图表标记">ECharts · 示例数据</span></div>
          <div class="EChart画布" id="chart-pie"></div>
          <div class="图表说明条"><span>建议：不超过 5 个主要类别</span><span>中心保留总量或核心结论</span></div>
        </section>

        <section class="图表模块 复杂组合图">
          <div class="图表抬头"><div><span class="图表类型">复杂组合数据</span><h4>规模增长与完成质量同时观察</h4><p>柱状展示参与规模，折线展示完成率；双轴只在指标单位确实不同且关系明确时使用。</p></div><span class="图表标记">ECharts · 双轴组合 · 示例数据</span></div>
          <div class="EChart画布" id="chart-combo"></div>
          <div class="图表说明条"><span>柱：参与规模</span><span>线：完成率</span><span>适合同时观察“量”与“质量”</span></div>
        </section>
      </div>`;
    dataGroup.insertAdjacentElement('afterend', chartGroup);
    if (typeof observer !== 'undefined') observer.observe(chartGroup);
  }

  /* ==================== 新闻 / 文章 / 案例 ==================== */
  const imageGroup = findGroup('图文内容库');
  if (imageGroup && !document.querySelector('.内容发布组')) {
    const contentGroup = document.createElement('div');
    contentGroup.className = '组件组 显现 内容发布组';
    contentGroup.innerHTML = `
      <div class="组件组头">
        <h3>新闻、文章与案例</h3>
        <p>三类内容承担不同任务：新闻强调时效与信息密度，文章强调观点与阅读深度，案例强调视觉证据与成果。版式也应因此不同，而不是统一套用同一种卡片。</p>
        <div class="用途">适用：资讯中心、研究洞察、品牌内容、客户案例、项目成果</div>
      </div>
      <div class="内容组件库">
        <section class="内容分组 新闻组件">
          <div class="内容分组头"><h4>新闻</h4><p>用一个主新闻建立视觉焦点，其余消息用紧凑列表提高浏览效率。</p><span>主新闻 + 列表</span></div>
          <div class="新闻布局">
            <article class="主新闻">
              <img src="https://images.unsplash.com/photo-1497366811364-ccf3f3b1b6c0?auto=format&fit=crop&w=1800&q=85" alt="现代办公与交流空间">
              <div class="主新闻文案"><div class="内容元信息"><span>机构动态</span><time>2026.08.18</time></div><h5>新的研究与服务中心正式启用，进一步连接研究、实践与真实应用。</h5><p>主新闻适合承载近期最重要的信息，同时保持足够的背景图空间，让页面仍然有视觉呼吸。</p><a class="内容文本链接" href="#落地组件">阅读新闻</a></div>
            </article>
            <div class="新闻列表">
              <article class="新闻条目"><time>2026.08.12</time><h5>年度研究计划发布，重点关注复杂问题中的长期变化。</h5><p>列表项只保留日期、标题和一句摘要。</p></article>
              <article class="新闻条目"><time>2026.08.05</time><h5>跨专业团队完成新一轮产品与服务验证。</h5><p>不需要每条新闻都配置图片。</p></article>
              <article class="新闻条目"><time>2026.07.28</time><h5>开放新的合作申请，面向机构与专业团队。</h5><p>重要入口可以使用轻量文本链接。</p><a class="内容文本链接" href="#落地组件">查看全部新闻</a></article>
            </div>
          </div>
        </section>

        <section class="内容分组 文章组件">
          <div class="内容分组头"><h4>文章与洞察</h4><p>文章组件强调观点、主题和阅读价值。主文章使用大图与大标题，次级文章降低视觉重量。</p><span>编辑式内容组合</span></div>
          <div class="文章布局">
            <article class="文章主项">
              <figure class="文章主图"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85" alt="空间与工作场景"></figure>
              <div class="文章主文"><div class="内容元信息"><span>方法与洞察</span><span>8 分钟阅读</span></div><h5>复杂项目真正需要的，不是更多信息，而是更好的信息结构。</h5><p>长文章标题应承担观点表达，摘要只负责说明阅读价值。不要把文章组件做成普通产品卡片。</p><a class="内容文本链接" href="#落地组件">阅读全文</a></div>
            </article>
            <div class="文章侧栏">
              <article class="文章侧项"><figure class="文章侧图"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=82" alt="建筑与工作空间"></figure><div class="文章侧文"><div class="内容元信息"><span>品牌表达</span></div><h5>为什么成熟的页面往往比想象中更克制？</h5><p>从尺度、留白和信息优先级理解视觉秩序。</p><a class="内容文本链接" href="#落地组件">阅读文章</a></div></article>
              <article class="文章侧项"><figure class="文章侧图"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=82" alt="团队协作"></figure><div class="文章侧文"><div class="内容元信息"><span>组织与协作</span></div><h5>设计系统如何减少团队反复沟通与重复决策。</h5><p>把共识写进组件，而不是依赖个人记忆。</p><a class="内容文本链接" href="#落地组件">阅读文章</a></div></article>
            </div>
          </div>
        </section>

        <section class="内容分组 案例组件">
          <div class="内容分组头"><h4>案例</h4><p>案例优先用图片证明真实场景，再用极少文字说明项目类型、成果和价值。</p><span>非等宽图片矩阵</span></div>
          <div class="案例布局">
            <article class="案例项 案例主项"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85" alt="现代办公项目"><div class="案例文案"><span class="案例标签">品牌与空间系统</span><h5>把复杂业务转化为统一、可信、可持续的品牌体验。</h5><p>主案例使用更大图片与更少文字，重点突出结果与视觉证据。</p></div></article>
            <article class="案例项"><img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1000&q=82" alt="会议空间项目"><div class="案例文案"><span class="案例标签">研究与咨询</span><h5>从研究结果到可执行方案</h5></div></article>
            <article class="案例项"><img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=82" alt="办公空间案例"><div class="案例文案"><span class="案例标签">产品与服务设计</span><h5>建立长期一致的服务体验</h5></div></article>
          </div>
        </section>
      </div>`;
    imageGroup.insertAdjacentElement('afterend', contentGroup);
    if (typeof observer !== 'undefined') observer.observe(contentGroup);
  }

  /* ==================== ECharts 加载与初始化 ==================== */
  const chartTargets = ['chart-line', 'chart-bar', 'chart-pie', 'chart-combo'];
  if (!chartTargets.some(id => document.getElementById(id))) return;

  const loadECharts = (done) => {
    if (window.echarts) return done();
    const existing = document.querySelector('script[data-echarts-loader]');
    if (existing) {
      existing.addEventListener('load', done, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js';
    script.async = true;
    script.dataset.echartsLoader = 'true';
    script.onload = done;
    document.head.appendChild(script);
  };

  const initCharts = () => {
    if (!window.echarts) return;
    const theme = {
      ink: '#202629', text: '#3F484A', weak: '#6F7879', primary: '#7B8E90', deep: '#5F7375',
      pale: '#C8D3D2', warm: '#D9D4CB', surface: '#FAFAF8', grid: 'rgba(32,38,41,.09)'
    };
    const axisLabel = { color: theme.weak, fontSize: 11 };
    const splitLine = { lineStyle: { color: theme.grid } };
    const tooltip = { trigger: 'axis', backgroundColor: 'rgba(32,38,41,.94)', borderWidth: 0, textStyle: { color: '#fff', fontSize: 12 }, padding: [10, 12] };
    const instances = [];

    const lineEl = document.getElementById('chart-line');
    if (lineEl) {
      const chart = echarts.init(lineEl);
      chart.setOption({
        animationDuration: 800,
        grid: { left: 42, right: 18, top: 28, bottom: 34 },
        tooltip,
        xAxis: { type: 'category', boundaryGap: false, data: ['1月','2月','3月','4月','5月','6月','7月','8月'], axisLine: { lineStyle: { color: theme.grid } }, axisTick: { show: false }, axisLabel },
        yAxis: { type: 'value', min: 50, max: 100, axisLine: { show: false }, axisTick: { show: false }, axisLabel, splitLine },
        series: [{ name: '表现指数', type: 'line', smooth: .35, symbol: 'circle', symbolSize: 7, data: [62,68,65,74,79,83,87,91], lineStyle: { width: 3, color: theme.deep }, itemStyle: { color: theme.deep, borderColor: theme.surface, borderWidth: 2 }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{ offset:0, color:'rgba(123,142,144,.40)' },{ offset:.62, color:'rgba(123,142,144,.12)' },{ offset:1, color:'rgba(123,142,144,0)' }]) } }]
      });
      instances.push(chart);
    }

    const barEl = document.getElementById('chart-bar');
    if (barEl) {
      const chart = echarts.init(barEl);
      chart.setOption({
        animationDuration: 850,
        grid: { left: 74, right: 32, top: 20, bottom: 24 },
        tooltip: { ...tooltip, trigger: 'item' },
        xAxis: { type: 'value', max: 100, axisLine: { show:false }, axisTick: { show:false }, axisLabel, splitLine },
        yAxis: { type: 'category', inverse: true, data: ['行业研究','战略设计','内容体系','产品体验','持续服务'], axisLine: { show:false }, axisTick: { show:false }, axisLabel: { ...axisLabel, color: theme.text } },
        series: [{ type: 'bar', barWidth: 16, data: [92,84,78,73,66], label: { show:true, position:'right', color: theme.deep, fontSize:11, formatter:'{c}' }, itemStyle: { borderRadius:[0,8,8,0], color: new echarts.graphic.LinearGradient(0,0,1,0,[{ offset:0, color:'#B9C6C5' },{ offset:1, color:theme.deep }]) } }]
      });
      instances.push(chart);
    }

    const pieEl = document.getElementById('chart-pie');
    if (pieEl) {
      const chart = echarts.init(pieEl);
      chart.setOption({
        animationDuration: 850,
        tooltip: { trigger:'item', backgroundColor:'rgba(32,38,41,.94)', borderWidth:0, textStyle:{ color:'#fff', fontSize:12 } },
        legend: { orient:'vertical', right:18, top:'middle', icon:'circle', itemWidth:8, itemHeight:8, textStyle:{ color:theme.text, fontSize:11 }, itemGap:16 },
        graphic: [{ type:'text', left:'31%', top:'43%', style:{ text:'100%', fill:theme.ink, font:'600 26px PingFang SC, sans-serif', textAlign:'center' } },{ type:'text', left:'31%', top:'54%', style:{ text:'整体构成', fill:theme.weak, font:'11px PingFang SC, sans-serif', textAlign:'center' } }],
        series: [{ type:'pie', radius:['52%','72%'], center:['34%','50%'], avoidLabelOverlap:true, label:{ show:false }, itemStyle:{ borderColor:'#DCE4E3', borderWidth:3 }, data:[{ value:38, name:'研究与洞察', itemStyle:{ color:theme.deep } },{ value:27, name:'策略设计', itemStyle:{ color:theme.primary } },{ value:21, name:'产品体验', itemStyle:{ color:theme.pale } },{ value:14, name:'持续服务', itemStyle:{ color:theme.warm } }] }]
      });
      instances.push(chart);
    }

    const comboEl = document.getElementById('chart-combo');
    if (comboEl) {
      const chart = echarts.init(comboEl);
      chart.setOption({
        animationDuration: 900,
        grid: { left: 52, right: 54, top: 62, bottom: 38 },
        tooltip: { trigger:'axis', backgroundColor:'rgba(250,250,248,.96)', borderWidth:0, textStyle:{ color:theme.ink, fontSize:12 }, padding:[10,12], axisPointer:{ type:'shadow', shadowStyle:{ color:'rgba(255,255,255,.035)' } } },
        legend: { top:8, right:0, itemWidth:10, itemHeight:6, textStyle:{ color:'rgba(255,255,255,.62)', fontSize:11 }, data:['参与规模','完成率'] },
        xAxis: { type:'category', data:['阶段A','阶段B','阶段C','阶段D','阶段E','阶段F'], axisLine:{ lineStyle:{ color:'rgba(255,255,255,.10)' } }, axisTick:{ show:false }, axisLabel:{ color:'rgba(255,255,255,.52)', fontSize:11 } },
        yAxis: [
          { type:'value', name:'规模', nameTextStyle:{ color:'rgba(255,255,255,.42)', fontSize:10 }, axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'rgba(255,255,255,.42)', fontSize:10 }, splitLine:{ lineStyle:{ color:'rgba(255,255,255,.07)' } } },
          { type:'value', name:'%', min:40, max:100, nameTextStyle:{ color:'rgba(255,255,255,.42)', fontSize:10 }, axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'rgba(255,255,255,.42)', fontSize:10 }, splitLine:{ show:false } }
        ],
        series: [
          { name:'参与规模', type:'bar', barWidth:24, data:[420,580,720,860,990,1180], itemStyle:{ borderRadius:[5,5,0,0], color:new echarts.graphic.LinearGradient(0,0,0,1,[{ offset:0, color:'#BFD0CF' },{ offset:1, color:'#6E8385' }]) } },
          { name:'完成率', type:'line', yAxisIndex:1, smooth:.32, symbolSize:8, data:[58,63,69,76,82,88], lineStyle:{ width:3, color:'#E3DDD2' }, itemStyle:{ color:'#E3DDD2', borderColor:'#20282A', borderWidth:2 } }
        ]
      });
      instances.push(chart);
    }

    const resize = () => instances.forEach(chart => chart.resize());
    window.addEventListener('resize', resize, { passive:true });
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(resize);
      chartTargets.forEach(id => { const el=document.getElementById(id); if(el) ro.observe(el); });
    }
  };

  loadECharts(initCharts);
})();
