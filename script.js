// 页面基础交互：揭幕、FAQ、模块导航。
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
    button.addEventListener('click', () => button.parentElement.classList.toggle('展开'));
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
