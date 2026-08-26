(() => {
  const dropdowns = document.querySelectorAll('.mh-nav__dropdown');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.mh-header');
  const headerInner = header?.querySelector('.mh-header__inner');

  dropdowns.forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    if (!summary) return;

    const openMenu = () => {
      if (hoverCapable.matches) dropdown.open = true;
    };

    const closeMenu = () => {
      if (hoverCapable.matches) dropdown.open = false;
    };

    dropdown.addEventListener('mouseenter', openMenu);
    dropdown.addEventListener('mouseleave', closeMenu);

    summary.addEventListener('click', (event) => {
      if (hoverCapable.matches) {
        event.preventDefault();
        dropdown.open = true;
      }
    });

    dropdown.addEventListener('focusin', () => {
      dropdown.open = true;
    });

    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) dropdown.open = false;
    });
  });

  if (!header || !headerInner) return;

  header.style.transition = reducedMotion.matches
    ? 'none'
    : 'transform .36s cubic-bezier(.2,.7,.2,1), opacity .24s ease';
  header.style.willChange = 'transform, opacity';

  let lastScrollY = Math.max(window.scrollY, 0);
  let ticking = false;
  let isHidden = false;

  const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.open = false;
    });
  };

  const showHeader = () => {
    if (!isHidden) return;
    isHidden = false;
    header.style.transform = 'translate3d(0, 0, 0)';
    header.style.opacity = '1';
    headerInner.style.pointerEvents = 'auto';
  };

  const hideHeader = () => {
    if (isHidden) return;
    isHidden = true;
    closeDropdowns();
    header.style.transform = 'translate3d(0, calc(-100% - 28px), 0)';
    header.style.opacity = '0';
    headerInner.style.pointerEvents = 'none';
  };

  const updateHeaderOnScroll = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const delta = currentScrollY - lastScrollY;

    if (currentScrollY <= 36) {
      showHeader();
    } else if (Math.abs(delta) >= 6) {
      if (delta > 0) hideHeader();
      else showHeader();
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeaderOnScroll);
  }, { passive: true });
})();