// V2.10 compatibility loader — navigation and hierarchy are now owned by V2.11.
(() => {
  if(document.querySelector('script[data-hierarchy-loader]')) return;

  const loadHierarchy=()=>{
    if(document.querySelector('script[data-hierarchy-loader]')) return;
    const script=document.createElement('script');
    script.src='components-v15.js';
    script.defer=true;
    script.dataset.hierarchyLoader='true';
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