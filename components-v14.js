// V2.10 compatibility loader — navigation and hierarchy are now owned by V2.11.
(() => {
  if(document.querySelector('script[data-hierarchy-loader]')) return;
  const script=document.createElement('script');
  script.src='components-v15.js';
  script.defer=true;
  script.dataset.hierarchyLoader='true';
  document.body.appendChild(script);
})();