// 动态流程场景：SVG 与 HTML 场景共用固定 960×640 坐标系，只负责动画增强。
(() => {
  const group = document.querySelector('.流程视觉组');
  if (!group) return;

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
    script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const hairline = 'stroke-width:1.25;stroke-dasharray:none;stroke-linecap:round;stroke-linejoin:round;opacity:.66';
  const support = 'stroke-width:1;stroke-dasharray:none;stroke-linecap:round;stroke-linejoin:round;opacity:.42';

  const geometry = [
    {
      stage: '.全流程舞台',
      svg: `
        <path id="scene-route-a" class="流程场景路径 流程主路径" style="${hairline}" d="M122 320 H838"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M132 320 V304"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M365 320 V382"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M605 320 V304"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M828 320 V382"/>
        <rect class="流程信号" data-path="scene-route-a" x="-10" y="-1.5" width="20" height="3" rx="1.5"/>
      `
    },
    {
      stage: '.协同舞台',
      svg: `
        <path class="流程场景路径 流程支线路径" style="${support}" d="M270 160 H308"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M270 230 H308"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M270 300 H308"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M308 160 V300"/>
        <path class="流程场景路径 流程支线路径" style="${support}" d="M308 230 H326"/>
        <path id="scene-route-b" class="流程场景路径 流程主路径" style="${hairline}" d="M700 265 H718 Q728 265 728 275 V310 Q728 320 738 320 H746"/>
        <rect class="流程信号" data-path="scene-route-b" x="-9" y="-1.5" width="18" height="3" rx="1.5"/>
      `
    },
    {
      stage: '.迭代舞台',
      svg: `
        <path class="流程场景路径 流程主路径" style="${hairline}" d="M259 180 H326 Q338 180 338 192 V238 Q338 250 350 250 H365"/>
        <path class="流程场景路径 流程主路径" style="${hairline}" d="M595 250 H610 Q622 250 622 238 V192 Q622 180 634 180 H701"/>
        <path class="流程场景路径 流程主路径" style="${hairline}" d="M810 286 V402 Q810 414 798 414 H784 Q772 414 772 426 V530"/>
        <path class="流程场景路径 流程主路径" style="${hairline}" d="M634 530 H174 Q158 530 158 514 V302 Q158 286 142 286"/>
      `
    }
  ];

  const prepareGeometry = () => {
    geometry.forEach(({ stage, svg }) => {
      const root = group.querySelector(stage);
      const canvas = root?.querySelector('.流程场景连线');
      if (!canvas) return;
      canvas.setAttribute('viewBox', '0 0 960 640');
      canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.innerHTML = svg.trim();
    });
  };

  prepareGeometry();

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const compactQuery = window.matchMedia?.('(max-width: 900px)');
  const started = new WeakSet();

  const startSignal = (scene) => {
    if (!window.anime || compactQuery?.matches || prefersReduced) return;
    scene.querySelectorAll('.流程信号[data-path]').forEach(signal => {
      const id = signal.dataset.path;
      const route = scene.querySelector(`#${id}`) || document.getElementById(id);
      if (!route) return;
      const motion = window.anime.path(route);
      window.anime.set(signal, { opacity: 0 });
      window.anime({
        targets: signal,
        opacity: [{ value: 0, duration: 80 }, { value: .92, duration: 180 }, { value: .92, duration: 1800 }, { value: 0, duration: 220 }],
        translateX: motion('x'),
        translateY: motion('y'),
        rotate: motion('angle'),
        duration: 2280,
        easing: 'linear',
        loop: true,
        endDelay: 1900
      });
    });
  };

  const startScene = (scene) => {
    scene.classList.add('激活');
    if (started.has(scene) || prefersReduced || compactQuery?.matches || !window.anime) return;
    started.add(scene);

    const units = scene.querySelectorAll('.场景单元,.角色行');
    const mainPaths = [...scene.querySelectorAll('.流程主路径')];
    const supportPaths = [...scene.querySelectorAll('.流程支线路径')];
    const signals = scene.querySelectorAll('.流程信号');

    window.anime.set(signals, { opacity: 0 });
    supportPaths.forEach(path => { path.style.opacity = '0'; });

    const timeline = window.anime.timeline({ easing: 'easeOutCubic' });
    timeline
      .add({
        targets: units,
        opacity: [0, 1],
        translateY: [12, 0],
        delay: window.anime.stagger(90),
        duration: 580
      })
      .add({
        targets: supportPaths,
        opacity: [0, .42],
        delay: window.anime.stagger(55),
        duration: 340,
        easing: 'easeOutSine'
      }, '-=250')
      .add({
        targets: mainPaths,
        strokeDashoffset: [window.anime.setDashoffset, 0],
        delay: window.anime.stagger(110),
        duration: 700,
        easing: 'easeInOutSine'
      }, '-=180');

    timeline.finished.then(() => startSignal(scene)).catch(() => {});
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
    }, { threshold: .24, rootMargin: '0px 0px -8% 0px' });

    scenes.forEach(scene => observer.observe(scene));
  };

  Promise.all([
    loadScript('https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js', 'iconify'),
    loadScript('https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js', 'anime')
  ]).catch(() => {}).finally(observeScenes);
})();
