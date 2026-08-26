(() => {
  const dropdowns = document.querySelectorAll('.mh-nav__dropdown');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

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
})();