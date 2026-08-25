// 页面基础交互：揭幕、FAQ、模块导航、图片异常状态、Carousel 与 Slider。
(() => {
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('进入');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .10 })
    : null;

  document.querySelectorAll('.显现').forEach(element => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add('进入');
  });

  document.querySelectorAll('.问答 .问题').forEach(button => {
    const item = button.parentElement;
    const sync = () => button.setAttribute('aria-expanded', item.classList.contains('展开') ? 'true' : 'false');
    sync();
    button.addEventListener('click', () => {
      item.classList.toggle('展开');
      sync();
    });
  });

  const markBrokenImage = (img) => {
    if (img.dataset.fallbackReady === 'true') return;
    img.dataset.fallbackReady = 'true';
    const frame = img.parentElement;
    if (!frame) return;
    frame.classList.add('图片加载失败');
    img.hidden = true;
    if (frame.querySelector('.图片失败占位')) return;
    const fallback = document.createElement('span');
    fallback.className = '图片失败占位';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', img.alt ? `${img.alt}，图片加载失败` : '图片加载失败');
    fallback.innerHTML = '<span><i class="图片失败符号" aria-hidden="true"></i><strong>图片暂时无法显示</strong><span>请检查图片地址或稍后重试</span></span>';
    frame.appendChild(fallback);
  };

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => markBrokenImage(img), { once: true });
    if (img.complete && img.naturalWidth === 0) markBrokenImage(img);
  });

  const formatCount = (index, total) => `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  // 图文组合：横向 Slider。保留原有静态 DOM，无脚本时仍按普通内容库展示。
  document.querySelectorAll('.图文组合库').forEach(track => {
    const slides = [...track.children].filter(item => item.classList.contains('图文组合'));
    if (slides.length < 2) return;

    track.classList.add('横向滑动已启用');
    track.tabIndex = 0;
    track.setAttribute('role', 'region');
    track.setAttribute('aria-roledescription', 'carousel');
    track.setAttribute('aria-label', '图文内容横向 Slider');

    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
    });

    const controls = document.createElement('div');
    controls.className = '横向滑动控制';
    controls.innerHTML = `
      <div class="横向滑动信息">
        <strong>横向 Slider</strong>
        <span class="横向滑动计数" aria-live="polite">${formatCount(0, slides.length)}</span>
      </div>
      <div class="滑动方向键">
        <button type="button" class="Slider上一项" aria-label="上一项">←</button>
        <button type="button" class="Slider下一项" aria-label="下一项">→</button>
      </div>`;
    track.insertAdjacentElement('afterend', controls);

    const count = controls.querySelector('.横向滑动计数');
    const prev = controls.querySelector('.Slider上一项');
    const next = controls.querySelector('.Slider下一项');
    let current = 0;
    let raf = 0;

    const syncSlider = () => {
      const distances = slides.map(slide => Math.abs(slide.offsetLeft - track.scrollLeft));
      current = distances.indexOf(Math.min(...distances));
      count.textContent = formatCount(current, slides.length);
      prev.disabled = current <= 0;
      next.disabled = current >= slides.length - 1;
    };

    const goTo = (index, behavior = 'smooth') => {
      current = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({ left: slides[current].offsetLeft, behavior });
      count.textContent = formatCount(current, slides.length);
      prev.disabled = current <= 0;
      next.disabled = current >= slides.length - 1;
    };

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncSlider);
    }, { passive: true });

    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    window.addEventListener('resize', () => requestAnimationFrame(() => goTo(current, 'auto')), { passive: true });
    syncSlider();
  });

  // 案例：大幅 Carousel。手动切换，不自动播放，避免与页面阅读节奏争抢注意力。
  document.querySelectorAll('.案例布局').forEach(carousel => {
    const slides = [...carousel.children].filter(item => item.classList.contains('案例项'));
    if (slides.length < 2) return;

    carousel.classList.add('轮播已启用');
    carousel.tabIndex = 0;
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', '案例轮播图');

    const controls = document.createElement('div');
    controls.className = '轮播控制';
    controls.innerHTML = `
      <span class="轮播计数" aria-live="polite">${formatCount(0, slides.length)}</span>
      <button type="button" class="轮播上一张" aria-label="上一张">←</button>
      <button type="button" class="轮播下一张" aria-label="下一张">→</button>`;
    carousel.appendChild(controls);

    const count = controls.querySelector('.轮播计数');
    const prev = controls.querySelector('.轮播上一张');
    const next = controls.querySelector('.轮播下一张');
    let current = 0;
    let pointerStartX = null;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle('当前轮播', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      count.textContent = formatCount(current, slides.length);
    };

    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));

    carousel.addEventListener('keydown', event => {
      if (event.target !== carousel) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + 1);
      }
    });

    carousel.addEventListener('pointerdown', event => {
      if (event.target.closest('button')) return;
      pointerStartX = event.clientX;
    }, { passive: true });

    carousel.addEventListener('pointerup', event => {
      if (pointerStartX === null) return;
      const delta = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(delta) < 48) return;
      show(delta < 0 ? current + 1 : current - 1);
    }, { passive: true });

    carousel.addEventListener('pointercancel', () => { pointerStartX = null; }, { passive: true });
    show(0);
  });

  const navLinks = [...document.querySelectorAll('.导航 a[href^="#"]')];
  const targets = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    const navObserver = new IntersectionObserver(entries => {
      const active = entries
        .filter(entry => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      navLinks.forEach(link => {
        link.classList.toggle('当前模块', link.getAttribute('href') === `#${active.target.id}`);
      });
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0,.12,.3,.55] });
    targets.forEach(target => navObserver.observe(target));
  }
})();
