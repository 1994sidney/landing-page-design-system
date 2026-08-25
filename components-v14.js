// V2.10 compatibility loader — navigation and hierarchy are now owned by V2.11.
(() => {
  if(document.querySelector('script[data-hierarchy-loader]')) return;

  const loadChartPolish=()=>{
    if(document.querySelector('script[data-chart-polish-loader]')) return;
    const script=document.createElement('script');
    script.src='components-v17.js';
    script.defer=true;
    script.dataset.chartPolishLoader='true';
    document.body.appendChild(script);
  };

  const loadPolish=()=>{
    if(document.querySelector('script[data-polish-loader]')) return;
    const script=document.createElement('script');
    script.src='components-v16.js';
    script.defer=true;
    script.dataset.polishLoader='true';
    script.onload=loadChartPolish;
    document.body.appendChild(script);
  };

  const loadHierarchy=()=>{
    if(document.querySelector('script[data-hierarchy-loader]')) return;
    const script=document.createElement('script');
    script.src='components-v15.js';
    script.defer=true;
    script.dataset.hierarchyLoader='true';
    script.onload=loadPolish;
    document.body.appendChild(script);
  };

  const dynamicReady=()=>document.querySelector('.图表组件组') && document.querySelector('.内容发布组');
  if(dynamicReady()){
    loadHierarchy();
    return;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(dynamicReady() || attempts>=50){
      clearInterval(timer);
      loadHierarchy();
    }
  },100);
})();