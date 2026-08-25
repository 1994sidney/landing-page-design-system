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

  const geometry = [
    {
      stage: '.全流程舞台',
      svg: `
        <path id="scene-route-a" class="流程场景路径 流程主路径" d="M130 320 H830"/>
        <path class="流程场景路径 流程支线路径" d="M130 320 V304"/>
        <path class="流程场景路径 流程支线路径" d="M365 320 V382"/>
        <path class="流程场景路径 流程支线路径" d="M605 320 V304"/>
        <path class="流程场景路径 流程支线路径" d="M830 320 V382"/>
        <circle class="流程节点" cx="130" cy="320" r="6"/>
        <circle class="流程节点" cx="365" cy="320" r="6"/>
        <circle class="流程节点" cx="605" cy="320" r="6"/>
        <circle class="流程节点" cx="830" cy="320" r="6"/>
        <circle class="流程信号" data-path="scene-route-a" cx="0" cy="0" r="5"/>
      `
    },
    {
      stage: '.协同舞台',
      svg: `
        <path class="流程场景路径 流程支线路径" d="M270 160 C292 160 295 208 310 224"/>
        <path class="流程场景路径 流程支线路径" d="M270 230 H310"/>
        <path class="流程场景路径 流程支线路径" d="M270 300 C292 300 295 252 310 236"/>
        <path class="流程场景路径 流程支线路径" d="M310 230 H326"/>
        <path id="scene-route-b" class="流程场景路径 流程主路径" d="M700 265 C720 265 720 320 740 320"/>
        <circle class="流程节点" cx="310" cy="230" r="6"/>
        <circle class="流程节点" cx="700" cy="265" r="6"/>
        <circle class="流程节点" cx="740" cy="320" r="6"/>
        <circle class="流程信号" data-path="scene-route-b" cx="0" cy="0" r="5"/>
      `
    },
    {
      stage: '.迭代舞台',
      svg: `
        <path class="流程场景路径 流程主路径" d="M259 180 C320 180 315 250 365 250"/>
        <path class="流程场景路径 流程主路径" d="M595 250 C645 250 640 180 701 180"/>
        <path class="流程场景路径 流程主路径" d="M810 286 C810 350 772 400 772 446"/>
        <path class="流程场景路径 流程主路径" d="M634 525 C500 590 178 590 120 520 C84 476 90 326 148 286"/>
        <circle class="流程节点" cx="259" cy="180" r="6"/>
        <circle class="流程节点" cx="365" cy="250" r="6"/>
        <circle class="流程节点" cx="595" cy="250" r="6"/>
        <circle class="流程节点" cx="701" cy="180" r="6"/>
        <circle class="流程节点" cx="810" cy="286" r="6"/>
        <circle class="流程节点" cx="772" cy="446" r="6"/>
        <circle class="流程节点" cx="634" cy="525" r="6"/>
        <circle class="流程节点" cx="148" cy="286" r="6"/>
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
        opacity: [{ value: 1, duration: 180 }, { value: 1, duration: 2500 }, { value: 0, duration: 220 }],
        translateX: motion('x'),
        translateY: motion('y'),
        duration: 2900,
        easing: 'linear',
        loop: true,
        endDelay: 1500
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
    const nodes = scene.querySelectorAll('.流程节点');
    const signals = scene.querySelectorAll('.流程信号');

    window.anime.set(nodes, { opacity: 0, scale: .72, transformOrigin: 'center center' });
    window.anime.set(signals, { opacity: 0 });
    supportPaths.forEach(path => { path.style.opacity = '0'; });

    const timeline = window.anime.timeline({ easing: 'easeOutCubic' });
    timeline
      .add({
        targets: units,
        opacity: [0, 1],
        translateY: [14, 0],
        delay: window.anime.stagger(95),
        duration: 620
      })
      .add({
        targets: supportPaths,
        opacity: [0, 1],
        delay: window.anime.stagger(70),
        duration: 420,
        easing: 'easeOutSine'
      }, '-=280')
      .add({
        targets: mainPaths,
        strokeDashoffset: [window.anime.setDashoffset, 0],
        delay: window.anime.stagger(130),
        duration: 760,
        easing: 'easeInOutSine'
      }, '-=220')
      .add({
        targets: nodes,
        opacity: [0, 1],
        scale: [.72, 1],
        delay: window.anime.stagger(65),
        duration: 300,
        easing: 'easeOutBack'
      }, '-=460');

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
