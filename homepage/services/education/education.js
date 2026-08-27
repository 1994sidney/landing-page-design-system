(() => {
  const story = document.querySelector('[data-platform-story]');
  if (!story) return;

  const stage = story.querySelector('.edu-platform-story__stage');
  const track = story.querySelector('.edu-platform-story__track');
  const panels = Array.from(story.querySelectorAll('.edu-platform-story__panel'));
  const screens = Array.from(story.querySelectorAll('.edu-platform-story__screen'));
  if (!stage || !track || panels.length < 2) return;

  const desktop = window.matchMedia('(min-width: 981px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finalHoldScreens = 0.55;
  let stageHeight = window.innerHeight;
  let transitionTravel = 0;
  let ticking = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateScreenScale = () => {
    const screen = screens[0];
    if (!screen || !desktop.matches) {
      story.style.removeProperty('--edu-platform-screen-scale');
      story.style.removeProperty('--edu-platform-screen-height');
      return;
    }

    const available = screen.clientWidth || stage.clientWidth || 1160;
    const scale = clamp(available / 1160, 0.54, 0.9);
    story.style.setProperty('--edu-platform-screen-scale', scale.toFixed(4));
    story.style.setProperty('--edu-platform-screen-height', `${Math.round(760 * scale)}px`);
  };

  const resetStory = () => {
    story.style.removeProperty('height');
    story.style.removeProperty('--edu-platform-stage-height');
    story.style.removeProperty('--edu-platform-track-y');
    story.style.removeProperty('--edu-platform-screen-scale');
    story.style.removeProperty('--edu-platform-screen-height');
  };

  const updateLayout = () => {
    if (!desktop.matches || reducedMotion.matches) {
      resetStory();
      return;
    }

    stageHeight = Math.max(stage.getBoundingClientRect().height, 1);
    transitionTravel = (panels.length - 1) * stageHeight;

    story.style.setProperty('--edu-platform-stage-height', `${Math.round(stageHeight)}px`);
    story.style.height = `${Math.round(stageHeight * (panels.length + finalHoldScreens))}px`;
    updateScreenScale();
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
