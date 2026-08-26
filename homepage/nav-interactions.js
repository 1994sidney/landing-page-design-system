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

  /* Load the policy-section styles without adding another blocking stylesheet to the page shell. */
  if (!document.querySelector('link[data-policy-accordion]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './policy-accordion.css';
    stylesheet.dataset.policyAccordion = 'true';
    document.head.appendChild(stylesheet);
  }

  const contextSection = document.querySelector('#context');
  if (contextSection) {
    contextSection.innerHTML = `
      <div class="mh-container mh-policy-layout">
        <div class="mh-policy-copy">
          <span class="mh-eyebrow">政策背景</span>
          <h2>心理健康服务正在从单项服务走向持续的社会服务体系</h2>
          <p>国家相关政策正在推动心理健康服务进一步进入学校、城乡社区、企事业单位和不同人群的实际生活与工作场景。平台以专业资源、服务组织和持续运营为基础，推动服务从阶段性项目逐步走向更加稳定、规范和连续的实施体系。</p>
        </div>

        <div class="mh-policy-list" aria-label="心理健康相关政策">
          <details class="mh-policy-item" open>
            <summary>
              <span>
                <span class="mh-policy-item__meta">2026 · 国家卫生健康委等25部门</span>
                <span class="mh-policy-item__title">《健全社会心理服务体系和危机干预机制实施方案》</span>
              </span>
              <span class="mh-policy-item__toggle" aria-hidden="true"></span>
            </summary>
            <div class="mh-policy-item__content">
              <p>方案提出健全覆盖全人群、全生命周期的社会心理服务体系和危机干预机制，推动心理服务进一步进入城乡社区、学校、党政机关、企事业单位等场景，并加强心理援助、危机干预与专业服务资源衔接。</p>
              <a href="https://www.nhc.gov.cn/yzygj/c100068/202604/4133f984e77741299f1c4660de1947f0.shtml" target="_blank" rel="noopener noreferrer">查看完整政策</a>
            </div>
          </details>

          <details class="mh-policy-item">
            <summary>
              <span>
                <span class="mh-policy-item__meta">2023 · 教育部等17部门</span>
                <span class="mh-policy-item__title">《全面加强和改进新时代学生心理健康工作专项行动计划（2023—2025年）》</span>
              </span>
              <span class="mh-policy-item__toggle" aria-hidden="true"></span>
            </summary>
            <div class="mh-policy-item__content">
              <p>行动计划强调贯通大中小学各学段，贯穿学校、家庭和社会各方面，完善学生心理健康工作体系，并从教育教学、监测预警、咨询服务、队伍建设和协同机制等方面形成持续支持。</p>
              <a href="https://www.moe.gov.cn/srcsite/A17/moe_943/moe_946/202305/t20230511_1059219.html" target="_blank" rel="noopener noreferrer">查看完整政策</a>
            </div>
          </details>

          <details class="mh-policy-item">
            <summary>
              <span>
                <span class="mh-policy-item__meta">2019—2030 · 健康中国行动</span>
                <span class="mh-policy-item__title">《健康中国行动（2019—2030年）》心理健康促进行动</span>
              </span>
              <span class="mh-policy-item__toggle" aria-hidden="true"></span>
            </summary>
            <div class="mh-policy-item__content">
              <p>心理健康促进行动从个人和家庭、社会以及政府多个层面提出心理健康促进要求，强调心理健康教育、心理热线、心理评估、心理咨询以及危机干预等服务之间的衔接合作。</p>
              <a href="https://www.nhc.gov.cn/guihuaxxs/c100133/201907/2a6ed52f1c264203b5351bdbbadd2da8.shtml" target="_blank" rel="noopener noreferrer">查看完整政策</a>
            </div>
          </details>
        </div>
      </div>`;
  }
})();
