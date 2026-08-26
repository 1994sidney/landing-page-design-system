(() => {
  const articles = {
    'platform-content-service-system': {
      meta: '平台动态 · 2026年8月',
      title: '平台内容与服务体系持续完善',
      lead: '围绕教育、基层社会治理、企事业单位和社会公众，持续完善平台服务能力与业务入口。',
      body: [
        '平台持续围绕教育心理服务、社会心理服务以及专业发展与人才三个方向完善内容组织与服务入口，使不同服务对象能够更清晰地找到对应资源。',
        '后续资讯内容将结合政策、研究与项目实践持续更新，并与平台各业务页面形成更完整的内容连接。'
      ]
    },
    'social-psychological-service-policy': {
      meta: '政策与行业 · 2026年7月',
      title: '健全社会心理服务体系和危机干预机制的政策方向',
      lead: '结合国家政策方向，梳理社会心理服务体系建设对学校、社区和企事业单位的要求。',
      body: [
        '社会心理服务正在进一步进入学校、城乡社区、企事业单位和重点人群的实际生活与工作场景，服务重点也从单一活动逐步转向持续支持、资源协同与规范实施。',
        '平台将围绕这些长期方向，持续连接专业资源、服务组织与真实场景，为不同主体提供更清晰的服务入口和持续运营支持。'
      ]
    },
    'student-cognitive-learning-assessment': {
      meta: '专业研究 · 2026年6月',
      title: '学生认知与学习发展评估的科学基础',
      lead: '介绍认知科学、心理学与教育科学在学生学习发展研究与实践中的应用。',
      body: [
        '学生学习发展并不只由单一成绩指标决定。注意、工作记忆、信息加工、执行控制以及学习策略等因素，会共同影响学生理解任务、保持投入和完成学习活动的过程。',
        '将认知科学、心理学与教育实践结合，可以帮助学校和家庭从更具体的发展维度理解学生表现，并为后续支持与持续观察提供依据。'
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const article = articles[params.get('article')] || articles['platform-content-service-system'];
  document.title = `${article.title}｜中国心理健康服务运营平台`;
  document.getElementById('article-meta').textContent = article.meta;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-lead').textContent = article.lead;
  document.getElementById('article-body').innerHTML = article.body.map((paragraph) => `<p>${paragraph}</p>`).join('');
})();
