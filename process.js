// 流程场景动画：不绘制连接曲线，动画只增强已经稳定排版的工作画面。
(() => {
  const group = document.querySelector('.流程视觉组');
  if (!group) return;

  // 彻底移除历史路径 SVG，避免旧曲线在脚本加载前后出现或参与布局。
  group.querySelectorAll('.流程场景连线').forEach(svg => svg.remove());

  const loadScript = (src, key) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lib="${key}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.lib = key;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const started = new WeakSet();

  const startScene = (scene) => {
    scene.classList.add('激活');
    if (started.has(scene) || prefersReduced || !window.anime) return;
    started.add(scene);

    const units = scene.querySelectorAll('.场景单元,.角色行');
    const details = scene.querySelectorAll(
      '.搜索条,.资料行,.结构网格,.设计预览,.验证指标,.验证清单,' +
      '.工作台导航,.协作画板,.交付状态,.结果数值,' +
      '.反馈消息,.分析环,.发布画面,.回流内容'
    );

    window.anime.set(units, { opacity: 0, translateY: 10 });
    window.anime.set(details, { opacity: 0, translateY: 6 });

    window.anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: units,
        opacity: [0, 1],
        translateY: [10, 0],
        delay: window.anime.stagger(85),
        duration: 560
      })
      .add({
        targets: details,
        opacity: [0, 1],
        translateY: [6, 0],
        delay: window.anime.stagger(36),
        duration: 420,
        easing: 'easeOutSine'
      }, '-=280');
  };

  const observeScenes = () => {
    const scenes = group.querySelectorAll('.流程动态场景');

    if (!('IntersectionObserver' in window)) {
      scenes.forEach(startScene);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        startScene(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: .18,
      rootMargin: '0px 0px -6% 0px'
    });

    scenes.forEach(scene => observer.observe(scene));
  };

  Promise.all([
    loadScript('https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js', 'iconify'),
    loadScript('https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js', 'anime')
  ]).catch(() => {}).finally(observeScenes);
})();
