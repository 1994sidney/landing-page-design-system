(() => {
  const policyList = document.querySelector('.mh-policy-list');
  if (!policyList) return;

  /*
   * Single authoritative policy source for the homepage.
   * Rendering from here prevents an older three-item HTML fragment from surviving
   * in the browser while newer accordion code is already loaded.
   */
  const policies = [
    {
      meta: '2026 · 社会心理服务',
      title: '《健全社会心理服务体系和危机干预机制实施方案》',
      summary: '由国家卫生健康委、中央社会工作部、教育部等多部门联合印发，提出到2030年基本健全覆盖全人群、全生命周期的社会心理服务体系和危机干预机制，并明确基层社区、学校、企事业单位、重点人群、科普宣传和心理援助等服务任务。',
      href: 'https://www.nhc.gov.cn/yzygj/c100068/202604/4133f984e77741299f1c4660de1947f0.shtml'
    },
    {
      meta: '2026 · 教育系统',
      title: '《教育部关于全面推进健康学校建设的指导意见》',
      summary: '围绕“健康第一”和身心一体理念推进健康学校建设，将学生心理健康与体质、视力、营养等共同纳入学校健康治理，强调源头预防、系统治理以及政府、学校、家庭和社会多方协同。',
      href: 'https://www.moe.gov.cn/srcsite/A17/moe_943/moe_946/202602/t20260227_1429365.html'
    },
    {
      meta: '2025—2027 · 心理健康与精神卫生',
      title: '《“儿科和精神卫生服务年”行动方案（2025—2027年）》',
      summary: '国家卫生健康委等部门部署为期三年的专项行动，提升心理健康和精神卫生服务可及性，推动心理门诊、心理问题筛查、社区心理服务、12356心理援助热线和心理健康科普宣传等工作持续落地。',
      href: 'https://www.nhc.gov.cn/yzygj/c100068/202504/57e9fc983bd74e7cb388af9d2557ecc9.shtml'
    },
    {
      meta: '2024—2035 · 教育发展',
      title: '《教育强国建设规划纲要（2024—2035年）》',
      summary: '将学生健康成长和全面发展纳入教育强国建设的重要任务，明确普及心理健康教育、建立全国学生心理健康监测预警系统，并分学段完善心理健康服务工作机制，为教育系统长期心理健康建设提供政策基础。',
      href: 'https://www.moe.gov.cn/jyb_xxgk/moe_1777/moe_1778/202501/t20250119_1176193.html'
    },
    {
      meta: '2019—2030 · 健康中国',
      title: '《健康中国行动（2019—2030年）》',
      summary: '设置“心理健康促进行动”和“中小学健康促进行动”等专项行动，从公众心理健康素养、社区服务、企事业单位心理支持、重点人群关爱、专业人才培养和危机干预等方面提出到2030年的持续建设目标。',
      href: 'https://www.nhc.gov.cn/guihuaxxs/c100133/201907/2a6ed52f1c264203b5351bdbbadd2da8.shtml'
    }
  ];

  policyList.dataset.policyVersion = '20260826-policy5-v3';
  policyList.innerHTML = policies.map((policy) => `
    <details class="mh-policy-item">
      <summary>
        <span>
          <span class="mh-policy-item__meta">${policy.meta}</span>
          <strong class="mh-policy-item__title">${policy.title}</strong>
        </span>
        <span class="mh-policy-item__toggle" aria-hidden="true"></span>
      </summary>
      <div class="mh-policy-item__content">
        <p>${policy.summary}</p>
        <a href="${policy.href}" target="_blank" rel="noopener noreferrer">查看完整政策</a>
      </div>
    </details>
  `).join('');

  const items = [...policyList.querySelectorAll('.mh-policy-item')];
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
