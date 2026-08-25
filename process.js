// 动态流程场景：只增强 index.html 中已经存在的流程 DOM。
(() => {
  const group = document.querySelector('.流程视觉组');
  if (!group) return;

  const loadScript = (src, key) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lib="${key}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.lib = key;
    script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const started = new WeakSet();

  const startScene = (scene) => {
    scene.classList.add('激活');
    if (prefersReduced || started.has(scene) || !window.anime) return;
    started.add(scene);

    window.anime({
      targets: scene.querySelectorAll('.场景单元,.角色行'),
      opacity: [0,1],
      translateY: [18,0],
      delay: window.anime.stagger(90),
      duration: 760,
      easing: 'easeOutCubic'
    });

    scene.querySelectorAll('.流程信号[data-path]').forEach(packet => {
      const id = packet.dataset.path;
      const route = document.getElementById(id);
      if (!route) return;
      const motion = window.anime.path(`#${id}`);
      window.anime({
        targets: packet,
        translateX: motion('x'),
        translateY: motion('y'),
        rotate: motion('angle'),
        duration: 5200,
        easing: 'linear',
        loop: true
      });
    });
  };

  const observeScenes = () => {
    const scenes = group.querySelectorAll('.流程动态场景');
    if (!('IntersectionObserver' in window)) {
      scenes.forEach(startScene);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startScene(entry.target);
      });
    }, { threshold: .22 });
    scenes.forEach(scene => observer.observe(scene));
  };

  Promise.all([
    loadScript('https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js', 'iconify'),
    loadScript('https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js', 'anime')
  ]).catch(() => {}).finally(observeScenes);
})();
