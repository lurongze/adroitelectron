---
title: 收藏的一些网站
---

这里放一些平时遇到的比较有用的网址，以防忘记

## Web前端导航
地址: <http://www.alloyteam.com/nav/>
> 一些腾讯前端团队整理的优秀的关于前端内容的网站。

## 木易杨前端进阶
地址：<https://muyiy.cn>
> 前端大佬的一个博客。

## 前端面试题
地址：<http://bigerfe.com/>
> 大佬总结的一些面试题。

## 记一次大厂的面试过程
地址：<https://juejin.im/post/5db556376fb9a0207a6ddce7>
> 又是大佬总结的面试经历。

## NODE.JS开发框架
地址： <https://docs.nestjs.cn/6/introduction>
> Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。


## PWA的一个工具
地址： <https://pwa.cafe/>
> 一款脚手架构建工具，方便创建基于Preact，React，Vue和Svelte的项目，开箱及支持Babel，Bublé，Browserlist，TypeScript，PostCSS，ESLint，Prettier和Service Workers！


## gulpjs中文文档
地址： <https://www.gulpjs.com.cn/docs/getting-started/quick-start/>
> gulpjs中文文档

## 深入浅出 Webpack
地址： <https://webpack.wuhaolin.cn/>
> 深入浅出 Webpack

## GraphQL
地址： <http://graphql.cn/>
> GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

## electron builder
地址： <https://www.electron.build/>
> electron builder网站，里面有推荐的electron react 的样板代码。

## COCOS-CREATOR
地址： <https://docs.cocos.com/creator/manual/zh/getting-started/introduction.html>
> COCOS 是一款游戏引擎。

## PWA 应用实战
地址： <https://lavas-project.github.io/pwa-book/?tdsourcetag=s_pctim_aiomsg>
> 本书围绕着 PWA 以及周边技术，从概念入手，以实战的方式给读者讲述如何编写 PWA，以及如何编写体验最好、速度最快、安全的 PWA 站点。

## midway
地址： <https://midwayjs.org/midway/>
> 面向未来的 Web 全栈应用开发框架。

## quasarchs
地址： <http://www.quasarchs.com/>
> Quasar允许开发人员编写一次代码，然后使用相同的代码库同时部署为网站、PWA、Mobile App和Electron App。使用最先进的CLI设计应用程序，并提供精心编写，速度非常快的Quasar Web组件。

## jave2服务端音视频转换
地址： <https://github.com/a-schild/jave2>
> JAVA服务端音视频转换。ffmpeg-wrapper 

## JS前端生成excel 文档
地址： <https://github.com/SheetJS/js-xlsx.git>
> 可以在浏览器生成excel文件。例子如下：
```js
import XLSX from 'xlsx';
export const downExcel = (fileName = 'sheetjs', header, list) => {
  const ws = XLSX.utils.aoa_to_sheet([...[header], ...list]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  /* generate file and send to client */
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
```

## Dexie
地址： <https://dexie.org/>
> A Minimalistic Wrapper for IndexedDB。IndexedDB的封装框架。

## DvaJS
地址： <https://dvajs.com/>
> dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

## Next.js
地址： <http://nextjs.frontendx.cn/>
> Next.js 是一个轻量级的 React 服务端渲染应用框架。

## Konva 中文文档
地址： <https://konvajs.com/docs/>
> Konva是一个基于 Canvas 开发的 2d JavaScript框架库, 它可以轻松的实现桌面应用和移动应用中的图形交互交互效果。

## Three.js 中文教程
地址： <http://www.techbrood.com/threejs/docs/>
> Three.js是一款开源的主流3D绘图JS引擎（名字Three就是3D的含义），原作者为Mr.Doob，项目地址为：https://github.com/mrdoob/three.js/。

## 阿里巴巴开源产品列表
地址： <https://1024.yuque.com/，https://www.yuque.com/yuque/blog/1024>
> 包含了阿里巴巴开源的多个产品，对于提升工作效率很有帮助。包括了设计，编程工具多方面的内容。

## ELECTRON文档
地址： <https://electronjs.org/docs>
> 使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用。

## LAVAS
地址： <https://lavas.baidu.com/>
> 百度开发的基于 Vue.js 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题。我其实是很期待react版本出来的。

## 50+个有用的Docker工具
地址： <http://dockone.io/article/3023>
> 随着容器化落地生根，以及迎合容器化趋势，几十个工具如雨后春笋般涌现。看看你正在使用的工具就知道了，不管是编排，CI/CD，还是日志，监控，以及其他等等。

## DockerStore
地址： <https://store.docker.com/>
> docker 的镜像仓库。Find Trusted and Enterprise Ready Containers, Plugins, and Docker Editions.

## 谷歌PWA框架
地址： <https://zoumiaojiang.com/article/amazing-workbox-3/>
> workbox 是 GoogleChrome 团队推出的一套 Web App 静态资源和请求结果的本地存储的解决方案，该解决方案包含一些 Js 库和构建工具，在 Chrome Submit 2017 上首次隆重面世。

## 国内10大前端团队网站

### 淘宝前端团队（FED）
地址： <http://taobaofed.org/>
> 阿里巴巴淘宝前端团队网站，一群崇尚极客精神的人正在用技术为体验提供无限可能。在这里，可以涉及“无线”、“全栈”、“工程”、“安全”、“架构”等多方面的技术。

### FEX 百度前端研发部
地址： <http://fex.baidu.com/>
> FEX 是百度「Web 前端研发部」的内部名称，其中 FE 是 Front End 的缩写，X 代表我们不仅关注前端技术，还更重视全端及全栈的能力。

### Alloy Team 腾讯Web前端团队
地址： <http://www.alloyteam.com/>
> 腾讯Web前端团队 – Alloy Team，源于2008年成立的腾讯WebQQ团队，致力于Web前端技术的研究，热衷HTML5、移动Web技术，用最酷的新技术开发各种有趣的开源项目。

### 奇舞团
地址： <https://75team.com/>
> 360奇舞团（奇虎75Team）是 奇虎360公司Web平台部前端工程师 + 部分特约嘉宾 组成的一个前端团队。这里产出很多的开源项目和产品，如 ThinkJS 一款Node.js MVC框架，众成翻译—一款友好的翻译平台等。

### 凹凸实验室： https://aotu.io/
地址： <http://taobaofed.org/>
> 凹凸实验室(http://Aotu.io，英文简称O2) 始建于2015年10月，是一个年轻基情的技术团队。O2面向多终端技术体系，致力于构建沉淀与分享包括但不限于交互、页面制作技巧、前端开发、原生APP开发等方面的专业知识及案例。

### YMFE 去哪儿大前端技术中心
地址： <https://ymfe.org/>
> 去哪儿网大前端技术中心（YMFE）是由 FE，iOS 和 Android 工程师共同组成的，去哪儿最具想象力、创造力和影响力的大前端团队，致力于为业务开发提供一体化的移动开发解决方案，努力提升各个产品线在移动端的开发效率及使用体验。

### JDC 京东设计中心
地址： <http://jdc.jd.com/>
> 京东的用户体验设计团队，分享内容涵盖UR用户研究、ID交互设计、VD视觉设计、FD前端开发

### 饿了么前端
地址： <https://fe.ele.me>
> 饿了么前端的网址重定向到了饿了么前端在知乎上的专栏 https://zhuanlan.zhihu.com/ElemeFE，他们在 github 上也开源了很多好东西。

### 携程UED
地址： <http://ued.ctrip.com/>
> 携程UED团队在体现携程产品设计全局观的基础上建立细致的产品设计规范，通过用户研究，推动设计改进，以优化交互、视觉及产品体验。

### 美团前端
地址： <https://tech.meituan.com/>
> 美团前端团队近年来快速发展，由原来的前端团队转变成涵盖Web、iOS和Android 而组成美团大前端。