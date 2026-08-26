(() => {
  const items = [...document.querySelectorAll('.mh-policy-item')];
  if (!items.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 360;
  const easing = 'cubic-bezier(.2,.7,.2,1)';

  const clearInlineState = (item) => {
    item.classList.remove('is-animating');
    item.style.height = '';
  };

  const closeItem = (item) => {
    if (!item.open) return Promise.resolve();
    const summary = item.querySelector('summary');
    const content = item.querySelector('.mh-policy-item__content');
    if (!summary || !content || reducedMotion.matches) {
      item.open = false;
      return Promise.resolve();
    }

    const startHeight = item.getBoundingClientRect().height;
    const endHeight = summary.getBoundingClientRect().height;
    item.classList.add('is-animating');
    item.style.height = `${startHeight}px`;

    const panelAnimation = item.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration, easing }
    );
    content.animate(
      [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }],
      { duration: duration * .58, easing, fill: 'forwards' }
    );

    return panelAnimation.finished.catch(() => {}).then(() => {
      item.open = false;
      content.getAnimations().forEach((animation) => animation.cancel());
      clearInlineState(item);
    });
  };

  const openItem = (item) => {
    if (item.open) return Promise.resolve();
    const summary = item.querySelector('summary');
    const content = item.querySelector('.mh-policy-item__content');
    if (!summary || !content || reducedMotion.matches) {
      item.open = true;
      return Promise.resolve();
    }

    item.open = true;
    const startHeight = summary.getBoundingClientRect().height;
    const endHeight = item.scrollHeight;
    item.classList.add('is-animating');
    item.style.height = `${startHeight}px`;

    const panelAnimation = item.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration, easing }
    );
    content.animate(
      [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: duration * .82, delay: 55, easing, fill: 'both' }
    );

    return panelAnimation.finished.catch(() => {}).then(() => {
      content.getAnimations().forEach((animation) => animation.cancel());
      clearInlineState(item);
    });
  };

  items.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (item.classList.contains('is-animating')) return;

      if (item.open) {
        closeItem(item);
        return;
      }

      items.forEach((other) => {
        if (other !== item && other.open && !other.classList.contains('is-animating')) {
          closeItem(other);
        }
      });
      openItem(item);
    });
  });
})();
