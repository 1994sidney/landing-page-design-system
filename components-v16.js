// V2.12 — 内容图片、文本链接目标、基础组件与表单细节修正
(() => {
  const findSmallModule=(title)=>[...document.querySelectorAll('.系统小模块')].find(group=>group.querySelector('.组件组头 h3')?.textContent.trim()===title);

  const apply=()=>{
    const basicModule=document.getElementById('模块-基础组件');
    if(!basicModule) return false;

    // 基础组件：彻底移除“界面语言”。
    const interfaceLanguage=findSmallModule('界面语言');
    if(interfaceLanguage) interfaceLanguage.remove();
    const basicDesc=basicModule.querySelector('.系统模块说明');
    if(basicDesc) basicDesc.textContent='集中管理最常使用的基础界面元素，包括按钮、标签与卡片，让不同页面使用同一套交互与视觉表达。';

    // 新闻：替换失效图片，并让示例文本链接保持在内容模块内。
    const mainNewsImage=document.querySelector('.内容发布组 .主新闻 img');
    if(mainNewsImage){
      mainNewsImage.src='https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85';
      mainNewsImage.alt='团队交流与协作场景';
    }
    document.querySelectorAll('.内容发布组 .内容文本链接').forEach(link=>link.setAttribute('href','#模块-内容媒体'));

    // 摄影与图片：替换失效的示例摄影。
    const photoModule=findSmallModule('摄影与图片');
    const photoImage=photoModule?.querySelector('.摄影图 img');
    if(photoImage){
      photoImage.src='https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85';
      photoImage.alt='编辑感现代办公空间';
    }

    // 联系与表单：说明左侧直接叠在图片上，不再描述为双侧毛玻璃。
    const formModule=findSmallModule('联系与表单');
    const formDesc=formModule?.querySelector('.组件组头 p');
    if(formDesc) formDesc.textContent='表单保持安静并减少遮挡。左侧说明直接叠在背景摄影上，让环境成为视觉主体；右侧表单保留浅色半透明层和低对比字段底色，形成清晰的 5/7 信息关系。';

    return true;
  };

  if(apply()) return;
  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(apply() || attempts>=30) clearInterval(timer);
  },100);
})();