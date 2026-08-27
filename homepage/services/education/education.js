(() => {
  const story = document.querySelector('[data-platform-story]');
  if (!story) return;

  const stage = story.querySelector('.edu-platform-story__stage');
  const screen = story.querySelector('.edu-platform-story__screen');
  const desktop = window.matchMedia('(min-width: 981px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const ease = (value) => value * value * (3 - 2 * value);

  const updateScreenScale = () => {
    if (!screen || !desktop.matches) {
      story.style.removeProperty('--edu-platform-screen-scale');
      return;
    }

    const available = screen.clientWidth || stage?.clientWidth || 1160;
    const scale = clamp(available / 1160, 0.54, 0.9);
    story.style.setProperty('--edu-platform-screen-scale', scale.toFixed(4));
  };

  const resetStory = () => {
    story.style.removeProperty('--edu-platform-progress');
    updateScreenScale();
  };

  const updateStory = () => {
    ticking = false;

    if (!desktop.matches || reducedMotion.matches) {
      resetStory();
      return;
    }

    const rect = story.getBoundingClientRect();
    const viewport = window.innerHeight;
    const travel = Math.max(story.offsetHeight - viewport, 1);
    const raw = clamp(-rect.top / travel, 0, 1);
    const active = clamp((raw - 0.03) / 0.72, 0, 1);
    const progress = ease(active);

    story.style.setProperty('--edu-platform-progress', progress.toFixed(4));
    updateScreenScale();
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateStory);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  desktop.addEventListener?.('change', requestUpdate);
  reducedMotion.addEventListener?.('change', requestUpdate);

  updateStory();
})();
