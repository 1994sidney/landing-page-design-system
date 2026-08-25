// 数据图表：只负责加载 ECharts 与初始化静态 DOM 中的图表。
(() => {
  const chartTargets = ['chart-line', 'chart-bar', 'chart-pie', 'chart-radar', 'chart-combo'];
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
    const tooltip = {
      trigger: 'axis', backgroundColor: 'rgba(32,38,41,.94)', borderWidth: 0,
      textStyle: { color: '#fff', fontSize: 12 }, padding: [10, 12]
    };
    const instances = [];

    const mount = (id, option) => {
      const el = document.getElementById(id);
      if (!el) return;
      const previous = echarts.getInstanceByDom(el);
      if (previous) previous.dispose();
      const chart = echarts.init(el);
      chart.setOption(option);
      instances.push(chart);
    };

    mount('chart-line', {
      animationDuration: 800,
      grid: { left: 42, right: 18, top: 28, bottom: 34 },
      tooltip,
      xAxis: {
        type: 'category', boundaryGap: false,
        data: ['1月','2月','3月','4月','5月','6月','7月','8月'],
        axisLine: { lineStyle: { color: theme.grid } }, axisTick: { show: false }, axisLabel
      },
      yAxis: {
        type: 'value', min: 50, max: 100, axisLine: { show: false }, axisTick: { show: false }, axisLabel, splitLine
      },
      series: [{
        name: '表现指数', type: 'line', smooth: .35, symbol: 'circle', symbolSize: 7,
        data: [62,68,65,74,79,83,87,91],
        lineStyle: { width: 3, color: theme.deep },
        itemStyle: { color: theme.deep, borderColor: theme.surface, borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            { offset:0, color:'rgba(123,142,144,.40)' },
            { offset:.62, color:'rgba(123,142,144,.12)' },
            { offset:1, color:'rgba(123,142,144,0)' }
          ])
        }
      }]
    });

    mount('chart-bar', {
      animationDuration: 850,
      grid: { left: 74, right: 32, top: 20, bottom: 24 },
      tooltip: { ...tooltip, trigger: 'item' },
      xAxis: { type: 'value', max: 100, axisLine: { show:false }, axisTick: { show:false }, axisLabel, splitLine },
      yAxis: {
        type: 'category', inverse: true,
        data: ['行业研究','战略设计','内容体系','产品体验','持续服务'],
        axisLine: { show:false }, axisTick: { show:false }, axisLabel: { ...axisLabel, color: theme.text }
      },
      series: [{
        type: 'bar', barWidth: 16, data: [92,84,78,73,66],
        label: { show:true, position:'right', color: theme.deep, fontSize:11, formatter:'{c}' },
        itemStyle: {
          borderRadius: 0,
          color: new echarts.graphic.LinearGradient(0,0,1,0,[
            { offset:0, color:'#B9C6C5' }, { offset:1, color:theme.deep }
          ])
        }
      }]
    });

    mount('chart-pie', {
      animationDuration: 850,
      tooltip: {
        trigger:'item', backgroundColor:'rgba(32,38,41,.94)', borderWidth:0,
        textStyle:{ color:'#fff', fontSize:12 }
      },
      legend: {
        orient:'vertical', right:18, top:'middle', icon:'circle', itemWidth:8, itemHeight:8,
        textStyle:{ color:theme.text, fontSize:11 }, itemGap:16
      },
      graphic: [
        { type:'text', left:'31%', top:'43%', style:{ text:'100%', fill:theme.ink, font:'600 26px PingFang SC, sans-serif', textAlign:'center' } },
        { type:'text', left:'31%', top:'54%', style:{ text:'整体构成', fill:theme.weak, font:'11px PingFang SC, sans-serif', textAlign:'center' } }
      ],
      series: [{
        type:'pie', radius:['52%','72%'], center:['34%','50%'], avoidLabelOverlap:true,
        label:{ show:false }, itemStyle:{ borderColor:'#DCE4E3', borderWidth:3 },
        data:[
          { value:38, name:'研究与洞察', itemStyle:{ color:theme.deep } },
          { value:27, name:'策略设计', itemStyle:{ color:theme.primary } },
          { value:21, name:'产品体验', itemStyle:{ color:theme.pale } },
          { value:14, name:'持续服务', itemStyle:{ color:theme.warm } }
        ]
      }]
    });

    mount('chart-radar', {
      animationDuration: 850,
      tooltip: {
        trigger: 'item', backgroundColor: 'rgba(32,38,41,.94)', borderWidth: 0,
        textStyle: { color: '#fff', fontSize: 12 }, padding: [10, 12]
      },
      radar: {
        center: ['50%', '52%'], radius: '68%', splitNumber: 4, shape: 'polygon',
        indicator: [
          { name: '研究洞察', max: 100 }, { name: '策略设计', max: 100 },
          { name: '内容表达', max: 100 }, { name: '产品体验', max: 100 },
          { name: '持续服务', max: 100 }
        ],
        axisName: { color: '#5E6869', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(32,38,41,.12)' } },
        splitLine: { lineStyle: { color: 'rgba(32,38,41,.09)' } },
        splitArea: { areaStyle: { color: ['rgba(250,250,248,.28)', 'rgba(220,228,227,.18)'] } }
      },
      series: [{
        type: 'radar', symbol: 'circle', symbolSize: 6,
        lineStyle: { width: 2.5, color: theme.deep },
        itemStyle: { color: theme.deep }, areaStyle: { color: 'rgba(123,142,144,.28)' },
        data: [{ value: [88,76,82,69,74], name: '能力轮廓' }]
      }]
    });

    mount('chart-combo', {
      animationDuration: 900,
      grid: { left: 52, right: 54, top: 62, bottom: 38 },
      tooltip: {
        trigger:'axis', backgroundColor:'rgba(250,250,248,.96)', borderWidth:0,
        textStyle:{ color:theme.ink, fontSize:12 }, padding:[10,12],
        axisPointer:{ type:'shadow', shadowStyle:{ color:'rgba(255,255,255,.035)' } }
      },
      legend: {
        top:8, right:0, itemWidth:10, itemHeight:6,
        textStyle:{ color:'rgba(255,255,255,.62)', fontSize:11 }, data:['参与规模','完成率']
      },
      xAxis: {
        type:'category', data:['阶段A','阶段B','阶段C','阶段D','阶段E','阶段F'],
        axisLine:{ lineStyle:{ color:'rgba(255,255,255,.10)' } }, axisTick:{ show:false },
        axisLabel:{ color:'rgba(255,255,255,.52)', fontSize:11 }
      },
      yAxis: [
        {
          type:'value', name:'规模', nameTextStyle:{ color:'rgba(255,255,255,.42)', fontSize:10 },
          axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'rgba(255,255,255,.42)', fontSize:10 },
          splitLine:{ lineStyle:{ color:'rgba(255,255,255,.07)' } }
        },
        {
          type:'value', name:'%', min:40, max:100, nameTextStyle:{ color:'rgba(255,255,255,.42)', fontSize:10 },
          axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'rgba(255,255,255,.42)', fontSize:10 }, splitLine:{ show:false }
        }
      ],
      series: [
        {
          name:'参与规模', type:'bar', barWidth:24, data:[420,580,720,860,990,1180],
          itemStyle:{
            borderRadius:0,
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
              { offset:0, color:'#BFD0CF' }, { offset:1, color:'#6E8385' }
            ])
          }
        },
        {
          name:'完成率', type:'line', yAxisIndex:1, smooth:.32, symbolSize:8,
          data:[58,63,69,76,82,88], lineStyle:{ width:3, color:'#E3DDD2' },
          itemStyle:{ color:'#E3DDD2', borderColor:'#20282A', borderWidth:2 }
        }
      ]
    });

    const resize = () => instances.forEach(chart => chart.resize());
    window.addEventListener('resize', resize, { passive:true });
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(resize);
      chartTargets.forEach(id => {
        const el = document.getElementById(id);
        if (el) ro.observe(el);
      });
    }
  };

  loadECharts(initCharts);
})();
