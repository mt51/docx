const github = 'https://github.com/mt51/docx';

module.exports = {
  title: 'Docx',
  defaultLang: 'zh-CN',
  logo: {
    image: 'https://b.yzcdn.cn/assets/logo.png',
    href: '#/'
  },
  locales: {
    'zh-CN': {
      text: '中文',
      nav: [
        {
          name: '文档',
          items: [
            {
              title: '快速上手',
              path: 'readme',
            },
            {
              title: '更新日志',
              path: 'changelog',
            },
          ],
        },
      ]
    },
  }
};