(() => {
  const header = document.querySelector('.mh-header');
  if (!header) return;

  const dropdowns = [...header.querySelectorAll('.mh-nav__dropdown')];
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let lastScrollY = Math.max(window.scrollY, 0);
  let ticking = false;

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.open = false;
    });
  };

  dropdowns.forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    if (!summary) return;

    dropdown.addEventListener('mouseenter', () => {
      if (hoverCapable.matches) dropdown.open = true;
    });

    dropdown.addEventListener('mouseleave', () => {
      if (hoverCapable.matches) dropdown.open = false;
    });

    summary.addEventListener('click', (event) => {
      if (!hoverCapable.matches) return;
      event.preventDefault();
      dropdown.open = true;
    });

    dropdown.addEventListener('focusin', () => {
      dropdown.open = true;
    });

    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) dropdown.open = false;
    });
  });

  const updateHeaderOnScroll = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const delta = currentScrollY - lastScrollY;

    if (currentScrollY <= 36) {
      header.classList.remove('is-hidden');
    } else if (Math.abs(delta) >= 6) {
      if (delta > 0) {
        closeDropdowns();
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeaderOnScroll);
  }, { passive:true });
})();
