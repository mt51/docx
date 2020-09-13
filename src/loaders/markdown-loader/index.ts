import loaderUtils from 'loader-utils';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownCheckbox from 'markdown-it-checkbox';
import frontMatter from 'front-matter';
import highlight from './highlight';
import cardWrapper from './card-wrapper';
import linkOpen from './link-open';
import { slugify } from 'transliteration';

function wrapper(content: string) {
  content = cardWrapper(content);
  content = escape(content);

  return `
  import * as React from 'react';

  function RawHtmlRenderer(props) {
    return <section dangerouslySetInnerHTML={{ __html: props.html }}></section>;
  }

  class ReactMarkdownComponent extends React.PureComponent {

    render() {
      return <RawHtmlRenderer html={unescape('${content}')} />
    }
  }

  export default ReactMarkdownComponent;
`;
}

const parser = new MarkdownIt({
  html: true,
  highlight,
}).use(markdownItAnchor, {
  level: 2,
  slugify,
}).use(markdownCheckbox, {
  divClass: 'van-doc-checkbox'
});

export default function(source: string) {
  // @ts-ignore
  let options = loaderUtils.getOptions(this) || {};
  // @ts-ignore
  this.cacheable && this.cacheable();

  options = {
    // @ts-ignore
    wrapper,
    linkOpen: true,
    ...options,
  };

  let fm;

  if (options.enableMetaData) {
    fm = frontMatter(source);
    source = fm.body;
  }

  if (options.linkOpen) {
    linkOpen(parser);
  }

  // @ts-ignore
  return options.wrapper(parser.render(source), fm);
};


