(() => {
  const story = document.querySelector('[data-platform-story]');
  if (!story) return;

  const stage = story.querySelector('.edu-platform-story__stage');
  const track = story.querySelector('.edu-platform-story__track');
  const panels = Array.from(story.querySelectorAll('.edu-platform-story__panel'));
  if (!stage || !track || panels.length < 2) return;

  const desktop = window.matchMedia('(min-width: 981px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let stageHeight = window.innerHeight;
  let transitionTravel = 0;
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const resetStory = () => {
    story.style.removeProperty('height');
    story.style.removeProperty('--edu-platform-stage-height');
    story.style.removeProperty('--edu-platform-track-y');
  };

  const updateLayout = () => {
    if (!desktop.matches || reducedMotion.matches) {
      resetStory();
      return;
    }

    stageHeight = Math.max(window.innerHeight, 1);
    transitionTravel = (panels.length - 1) * stageHeight;

    story.style.setProperty('--edu-platform-stage-height', `${Math.round(stageHeight)}px`);
    story.style.height = `${Math.round(stageHeight + transitionTravel)}px`;
  };

  const updateStory = () => {
    ticking = false;

    if (!desktop.matches || reducedMotion.matches) {
      resetStory();
      return;
    }

    const rect = story.getBoundingClientRect();
    const scrolledInsideStory = clamp(-rect.top, 0, transitionTravel);
    story.style.setProperty('--edu-platform-track-y', `${(-scrolledInsideStory).toFixed(1)}px`);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateStory);
  };

  const handleLayoutChange = () => {
    window.requestAnimationFrame(() => {
      updateLayout();
      updateStory();
    });
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', handleLayoutChange);
  desktop.addEventListener?.('change', handleLayoutChange);
  reducedMotion.addEventListener?.('change', handleLayoutChange);

  updateLayout();
  updateStory();
})();
