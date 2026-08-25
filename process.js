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

  const lightBase = 'fill:none;stroke:rgba(95,115,117,.10);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;opacity:.72';
  const lightMain = 'fill:none;stroke:rgba(95,115,117,.56);stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round;opacity:.92';
  const darkBase = 'fill:none;stroke:rgba(220,228,227,.09);stroke-width:12;stroke-linecap:round;stroke-linejoin:round;opacity:.82';
  const darkMain = 'fill:none;stroke:rgba(220,228,227,.52);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;opacity:.94';

  const geometry = [
    {
      stage: '.全流程舞台',
      svg: `
        <path class="流程场景路径 流程轨迹底" style="${lightBase}" d="M44 350 C155 430 238 226 342 346 C455 474 546 216 650 330 C758 442 833 246 918 338"/>
        <path id="scene-route-a" class="流程场景路径 流程主路径" style="${lightMain}" d="M44 350 C155 430 238 226 342 346 C455 474 546 216 650 330 C758 442 833 246 918 338"/>
        <rect class="流程信号" data-path="scene-route-a" x="-14" y="-1.5" width="28" height="3" rx="1.5"/>
      `
    },
    {
      stage: '.协同舞台',
      svg: `
        <path class="流程场景路径 流程轨迹底" style="${darkBase}" d="M48 394 C174 342 214 232 338 278 C492 335 536 452 678 410 C790 378 812 252 926 286"/>
        <path id="scene-route-b" class="流程场景路径 流程主路径" style="${darkMain}" d="M48 394 C174 342 214 232 338 278 C492 335 536 452 678 410 C790 378 812 252 926 286"/>
        <rect class="流程信号" data-path="scene-route-b" x="-13" y="-1.5" width="26" height="3" rx="1.5"/>
      `
    },
    {
      stage: '.迭代舞台',
      svg: `
        <path class="流程场景路径 流程轨迹底" style="${lightBase}" d="M58 300 C160 430 270 430 360 310 C455 185 535 185 630 310 C720 425 825 420 910 300 C900 455 800 545 650 540 C470 532 300 560 155 515 C88 493 55 410 58 300"/>
        <path id="scene-route-c" class="流程场景路径 流程主路径" style="${lightMain}" d="M58 300 C160 430 270 430 360 310 C455 185 535 185 630 310 C720 425 825 420 910 300 C900 455 800 545 650 540 C470 532 300 560 155 515 C88 493 55 410 58 300"/>
        <rect class="流程信号" data-path="scene-route-c" x="-14" y="-1.5" width="28" height="3" rx="1.5"/>
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
        opacity: [
          { value: 0, duration: 120 },
          { value: .86, duration: 260 },
          { value: .86, duration: 2500 },
          { value: 0, duration: 320 }
        ],
        translateX: motion('x'),
        translateY: motion('y'),
        rotate: motion('angle'),
        duration: 3200,
        easing: 'linear',
        loop: true,
        endDelay: 2200
      });
    });
  };

  const startScene = (scene) => {
    scene.classList.add('激活');
    if (started.has(scene) || prefersReduced || compactQuery?.matches || !window.anime) return;
    started.add(scene);

    const units = scene.querySelectorAll('.场景单元,.角色行');
    const basePaths = [...scene.querySelectorAll('.流程轨迹底')];
    const mainPaths = [...scene.querySelectorAll('.流程主路径')];
    const signals = scene.querySelectorAll('.流程信号');

    window.anime.set(signals, { opacity: 0 });
    window.anime.set(basePaths, { opacity: 0 });

    const timeline = window.anime.timeline({ easing: 'easeOutCubic' });
    timeline
      .add({
        targets: units,
        opacity: [0, 1],
        translateY: [12, 0],
        delay: window.anime.stagger(90),
        duration: 620
      })
      .add({
        targets: basePaths,
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutSine'
      }, '-=300')
      .add({
        targets: mainPaths,
        strokeDashoffset: [window.anime.setDashoffset, 0],
        duration: 1450,
        easing: 'easeInOutSine'
      }, '-=500');

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
