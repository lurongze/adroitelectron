import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

export function mdToHtml(mdData){
  const md = new markdownIt({
    html: false,
    debug: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
  
      return ""; // 使用额外的默认转义
    },
  });
  
  let arr = [];
  
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const title = tokens[idx + 1];
    arr.push(`${token.markup}${title.content}`);
    return `<${token.tag} id='${title.content}'>`;
  };
  
  const html = md.render(mdData);
  console.log("arr", arr);
  console.log("html", html);
  return {html, arr};
}
