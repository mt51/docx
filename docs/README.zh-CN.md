# Docx Cli

Docx Cli 是一个 React 组件库文档生产工具，通过 Docx Cli 可以快速构建组件库文档完。基于Vant Cli 实现

## 安装

```shell
# 通过 npm 安装
npm i docx -g 或 npm i docx -D

# 通过 yarn 安装
yarn global add docx 或 yarn add docx --dev
```

安装完成后，使用以下命令开始构建文档网站

```shell
# 全局安装
docx dev

# 作为开发依赖
npx docx dev

```
## 配置指南

- [配置指南](#)
  - [dpcx.config.js](#docxconfigjs)
    - [logo](#sitelogo)
    - [locales](#locales)
    - [defaultLang](#defaultLang)

## docx.config.js

`docx.config.js`中包含了`docx cli`的文档站点配置，请创建此文件并置于项目根目录下。下面是一份基本配置的示例：

### site.logo

- Type: `object`
- Default: `{}`

``` js
module.exports = {
  logo: {
    image: 'https://b.yzcdn.cn/assets/logo.png',
    href: '#/'
  }
}
```

文档站点的 Logo 和 Logo 的跳转链接。


### locales

- Type: `object[]`
- Default: `undefined`

文档站点的左侧导航，数组中的每个对象表示一个导航分组。

```js
module.exports = {
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
```

### outputDir

文档打包的输出目录
