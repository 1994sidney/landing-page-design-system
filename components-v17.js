// V2.13 — 数据图表细化：新增雷达图，并统一组合图柱体为直角
(() => {
  const apply = () => {
    const chartLibrary = document.querySelector('.图表组件组 .图表库');
    const pieModule = document.getElementById('chart-pie')?.closest('.图表模块');
    const comboEl = document.getElementById('chart-combo');
    if (!chartLibrary || !pieModule || !comboEl || !window.echarts) return false;

    // 在结构构成图右侧增加一种不重复的数据表达：雷达图。
    let radarEl = document.getElementById('chart-radar');
    if (!radarEl) {
      const radarModule = document.createElement('section');
      radarModule.className = '图表模块 雷达图';
      radarModule.innerHTML = `
        <div class="图表抬头">
          <div>
            <span class="图表类型">多维雷达</span>
            <h4>多维能力轮廓与均衡程度</h4>
            <p>适合同时观察多个能力维度的相对水平，重点看整体轮廓、优势项和短板，而不是单一排名。</p>
          </div>
          <span class="图表标记">ECharts · 示例数据</span>
        </div>
        <div class="EChart画布" id="chart-radar"></div>
        <div class="图表说明条"><span>建议：4–7 个维度</span><span>适合能力画像与多指标诊断</span></div>`;
      pieModule.insertAdjacentElement('afterend', radarModule);
      radarEl = radarModule.querySelector('#chart-radar');
    }

    if (radarEl && !echarts.getInstanceByDom(radarEl)) {
      const radar = echarts.init(radarEl);
      radar.setOption({
        animationDuration: 850,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(32,38,41,.94)',
          borderWidth: 0,
          textStyle: { color: '#fff', fontSize: 12 },
          padding: [10, 12]
        },
        radar: {
          center: ['50%', '52%'],
          radius: '68%',
          splitNumber: 4,
          shape: 'polygon',
          indicator: [
            { name: '研究洞察', max: 100 },
            { name: '策略设计', max: 100 },
            { name: '内容表达', max: 100 },
            { name: '产品体验', max: 100 },
            { name: '持续服务', max: 100 }
          ],
          axisName: { color: '#5E6869', fontSize: 11 },
          axisLine: { lineStyle: { color: 'rgba(32,38,41,.12)' } },
          splitLine: { lineStyle: { color: 'rgba(32,38,41,.09)' } },
          splitArea: {
            areaStyle: {
              color: ['rgba(250,250,248,.28)', 'rgba(220,228,227,.18)']
            }
          }
        },
        series: [{
          type: 'radar',
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5, color: '#5F7375' },
          itemStyle: { color: '#5F7375' },
          areaStyle: { color: 'rgba(123,142,144,.28)' },
          data: [{ value: [88, 76, 82, 69, 74], name: '能力轮廓' }]
        }]
      });
      const resize = () => radar.resize();
      window.addEventListener('resize', resize, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(radarEl);
    }

    // “规模增长与完成质量同时观察”的柱体改为直角，不影响渐变和折线。
    const combo = echarts.getInstanceByDom(comboEl);
    if (!combo) return false;
    combo.setOption({
      series: [{
        name: '参与规模',
        itemStyle: { borderRadius: 0 }
      }]
    });

    return true;
  };

  if (apply()) return;
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (apply() || attempts >= 60) clearInterval(timer);
  }, 100);
})();