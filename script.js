// 页面基础交互：揭幕、FAQ、模块导航、图片异常状态、Carousel、独立 Slider 与品牌 Marquee。
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

  const watchImage = (img) => {
    if (img.dataset.imageWatchReady === 'true') return;
    img.dataset.imageWatchReady = 'true';
    img.addEventListener('error', () => markBrokenImage(img), { once: true });
    if (img.complete && img.naturalWidth === 0) markBrokenImage(img);
  };

  const formatCount = (index, total) => `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  // 独立横向 Slider：新增组件，不改变原有五种图文组合的任何排版。
  const createStandaloneSlider = () => {
    const anchor = document.querySelector('.图文内容库组 .图文组合库');
    if (!anchor || anchor.parentElement.querySelector('.独立Slider组件')) return;

    const slider = document.createElement('section');
    slider.className = '独立Slider组件';
    slider.setAttribute('aria-label', '横向 Slider');
    slider.innerHTML = `
      <div class="独立Slider头">
        <h4>横向 Slider</h4>
        <div class="独立Slider控制">
          <span class="独立Slider计数" aria-live="polite">01 / 05</span>
          <button type="button" class="独立Slider上一项" aria-label="上一项">←</button>
          <button type="button" class="独立Slider下一项" aria-label="下一项">→</button>
        </div>
      </div>
      <div class="独立Slider视口">
        <div class="独立Slider轨道" tabindex="0" role="region" aria-roledescription="carousel" aria-label="项目与内容横向浏览">
          <article class="独立Slider卡" role="group" aria-label="1 / 5">
            <figure class="独立Slider图"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=84" alt="现代办公空间与项目环境"></figure>
            <div class="独立Slider文"><span>品牌与空间</span><h5>让真实场景成为品牌可信度的一部分。</h5><p>适合连续展示项目、产品、空间或案例摘要。</p></div>
          </article>
          <article class="独立Slider卡" role="group" aria-label="2 / 5">
            <figure class="独立Slider图"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=84" alt="团队协作与讨论场景"></figure>
            <div class="独立Slider文"><span>团队与协作</span><h5>用同一视觉节奏连续呈现多个并列主题。</h5><p>项目之间保持同构，浏览方式则保持连续。</p></div>
          </article>
          <article class="独立Slider卡" role="group" aria-label="3 / 5">
            <figure class="独立Slider图"><img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=84" alt="明亮开放式办公空间"></figure>
            <div class="独立Slider文"><span>产品与服务</span><h5>Slider 更适合并列内容，而不是替代复杂图文版式。</h5><p>每一项保持相同结构，才能形成稳定的横向浏览节奏。</p></div>
          </article>
          <article class="独立Slider卡" role="group" aria-label="4 / 5">
            <figure class="独立Slider图"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=84" alt="专业团队在工作空间中协作"></figure>
            <div class="独立Slider文"><span>研究与洞察</span><h5>保留下一项局部露出，让用户自然理解可以继续滑动。</h5><p>不自动播放，避免横向内容与页面阅读争夺注意力。</p></div>
          </article>
          <article class="独立Slider卡" role="group" aria-label="5 / 5">
            <figure class="独立Slider图"><img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=84" alt="会议与展示空间"></figure>
            <div class="独立Slider文"><span>案例与成果</span><h5>横向浏览适合扩展内容数量，而不拉长页面纵向长度。</h5><p>支持按钮、键盘方向键、触控板与手机触控。</p></div>
          </article>
        </div>
      </div>`;

    anchor.insertAdjacentElement('afterend', slider);

    const track = slider.querySelector('.独立Slider轨道');
    const slides = [...slider.querySelectorAll('.独立Slider卡')];
    const count = slider.querySelector('.独立Slider计数');
    const prev = slider.querySelector('.独立Slider上一项');
    const next = slider.querySelector('.独立Slider下一项');
    let current = 0;
    let raf = 0;

    const sync = () => {
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
      raf = requestAnimationFrame(sync);
    }, { passive: true });
    track.addEventListener('keydown', event => {
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

    slider.querySelectorAll('img').forEach(watchImage);
    sync();
  };

  // 合作机构：保留原静态 Logo strip，再增加一条持续向左缓慢滚动的品牌带。
  const createBrandMarquee = () => {
    const staticStrip = document.querySelector('.合作字标带');
    if (!staticStrip || staticStrip.parentElement.querySelector('.合作品牌滚动')) return;

    const brands = ['NORTH','MERIDIAN','FIELDWORK','ATLAS','COMMON','STUDIO 27','ORBIT','MONUMENT','SIGNAL','FORM / WORK'];
    const groupMarkup = brands.map(name => `<span class="合作滚动品牌"><strong>${name}</strong></span>`).join('');
    const marquee = document.createElement('div');
    marquee.className = '合作品牌滚动';
    marquee.setAttribute('role', 'region');
    marquee.setAttribute('aria-label', '合作品牌滚动展示');
    marquee.innerHTML = `
      <div class="合作品牌轨道">
        <div class="合作品牌组">${groupMarkup}</div>
        <div class="合作品牌组" aria-hidden="true">${groupMarkup}</div>
      </div>`;
    staticStrip.insertAdjacentElement('afterend', marquee);
  };

  createStandaloneSlider();
  createBrandMarquee();
  document.querySelectorAll('img').forEach(watchImage);

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