// 页面基础交互：揭幕、FAQ、模块导航、图片异常状态。
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
