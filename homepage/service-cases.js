(() => {
  const section = document.querySelector('#cases');
  if (!section) return;

  const track = section.querySelector('.mh-case-track');
  const cards = Array.from(section.querySelectorAll('.mh-case-card'));
  const prev = section.querySelector('.mh-case-control--prev');
  const next = section.querySelector('.mh-case-control--next');
  const quoteText = section.querySelector('.mh-case-quote__text');
  const clientCompany = section.querySelector('.mh-case-quote__meta strong');
  const clientService = section.querySelector('.mh-case-quote__meta span');
  const viewport = section.querySelector('.mh-case-carousel');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!track || !cards.length || !quoteText || !clientCompany || !clientService || !viewport) return;

  let activeIndex = 0;
  let autoplayTimer = null;

  const moveTrack = () => {
    const activeCard = cards[activeIndex];
    const firstCard = cards[0];
    const desired = activeCard.offsetLeft - firstCard.offsetLeft;
    const maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);
    track.style.transform = `translate3d(${-Math.min(desired, maxTranslate)}px,0,0)`;
  };

  const render = (index, restart = true) => {
    activeIndex = (index + cards.length) % cards.length;
    const card = cards[activeIndex];

    cards.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeIndex;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    quoteText.textContent = card.dataset.quote || '';
    clientCompany.textContent = card.dataset.clientCompany || '客户单位待补';
    clientService.textContent = card.dataset.clientService || '';
    moveTrack();

    if (restart) startAutoplay();
  };

  const stopAutoplay = () => {
    if (!autoplayTimer) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion.matches) return;
    autoplayTimer = window.setInterval(() => render(activeIndex + 1, false), 8000);
  };

  prev?.addEventListener('click', () => render(activeIndex - 1));
  next?.addEventListener('click', () => render(activeIndex + 1));

  cards.forEach((card, index) => {
    card.addEventListener('click', () => render(index));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        render(index);
      }
    });
  });

  section.addEventListener('mouseenter', stopAutoplay);
  section.addEventListener('mouseleave', startAutoplay);
  section.addEventListener('focusin', stopAutoplay);
  section.addEventListener('focusout', (event) => {
    if (!section.contains(event.relatedTarget)) startAutoplay();
  });

  window.addEventListener('resize', () => window.requestAnimationFrame(moveTrack), { passive: true });
  reducedMotion.addEventListener?.('change', startAutoplay);

  render(0);
})();
