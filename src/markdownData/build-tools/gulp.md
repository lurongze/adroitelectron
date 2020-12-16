---
title: Gulp学习
sidebarDepth: 2
---

## Gulp 安装
Gulp 一般需要在电脑上安装两个版本，一个是全局安装的版本，另一个是在项目里面安装的版本。

很多人安装了全局版本后，执行gulp命令后报错，其实是因为没有在项目里安装版本。

至于为什么要安装两个版本，主要是为了版本和依赖的控制。更多理解可百度查看。

Gulp 的一个文档网址: <https://www.gulpjs.com.cn/docs/getting-started/quick-start/>


## 编写 Gulp 任务常用的插件

- gulp-concat (文件合并)
- gulp-watch (监听文件修改)
- gulp-replace (替换文件内容)
- gulp-footer (在文件末尾添加内容)
- gulp-header (在文件头部添加内容)
- gulp-uglify (压缩文件内容)
- gulp-babel (babel 插件，可以转换 es6 代码)
- gulp-open (打开默认浏览器)
- gulp-connect (开一个本地服务器)
- gulp-rename (重命名文件)

## 其他一些引入的内容

- exec (调用命令行的 node 方法)

```js
const { exec } = require('child_process');
const execLine = 'node --version';
exec(execLine,(error, stdout, stderr)=>{
    if(error) {
        console.error('error:',error, stderr);
    } else {
        console.log('success:', stdout);
    }
    cb();
});
```

- minimist (命令行参数整理插件，更方便获取命令行传入的参数)

```js
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};
/**
 * 命令行： $ gulp scripts --env development
 * 如下获取参数 options.env
 */
const options = minimist(process.argv.slice(2), knownOptions);
```

## 第一个Gulp任务

```js
gulp.task('one',async (cb) => {

  const { data } = await axios.get('http://localhost:3000'); // 通过接口获取数据
  console.log('data', data); // 这里是以后接口获取生成数据

  console.log('gulp task one start......');

  gulp.src(['./gulp-learn/*.js', '!./gulp-learn/add.js']) // 数组第一个获取gulp-learn目录下的所有js文件，第二个标识排除掉add.js文件
    .pipe(replace('ABC', 'CBA')) // 内容替换
    .pipe(footer('\n// this is footer\n')) // 文件末尾加内容
    .pipe(header('\n// this is header\n')) // 文件头部加内容
    .pipe(concat('./all.js')) // 把src获取到的所有上面处理过的文件，合并成一个文件
    .pipe(replace('@@', '@@BB@@')) // 在合并后的all.js 里面替换内容
    .pipe(footer('\n// this is main footer\n'))
    .pipe(header('\n// this is main header\n'))
    .pipe(babel({
      presets: ['@babel/preset-env']
    })) // 把es6转换成es5
    .pipe(uglify()) // 代码压缩
    .pipe(gulp.dest('./gulp-dist')); // 制定生成的文件的目录
  console.log('编译完成');
  cb(); // 提供回调，表示任务已完成
});
```

## 执行多个任务

```js
// 命令行执行gulp 后，会先执行完one的任务，然后执行two的任务
gulp.task('default', gulp.series(['one', 'two']));
```

## Gulp起一个服务器

```js
// 打开浏览器，文件修改自动刷新的功能
gulp.task('server', () =>{
  connect.server({  // gulp-connect 
    root: './',
    livereload: true, // 启用自动刷新功能
    port: 3331
  });
  //open('http://localhost:3331');
  watch('./gulp-learn/*.js', ()=>{ // gulp-watch 监听文件变化，然后执行任务，浏览器刷新
    gulp.src('./gulp-learn/*.js') // 必须读取修改的文件内容
      .pipe(connect.reload());
  });
});
```

## Gulp模板文件生成
这里可以做一些开发的时候的模板文件的生成任务，方便开发。
- 先安装一个Gulp插件： gulp-template
- 编写任务
```js
gulp.task('temp', (cb)=>{
  gulp.src('./gulp-learn/javaClass.java')
    .pipe(template({
      name: 'mike',
      className: 'OrderData',
      attrList: [
        { name: 'title', type: 'String', remark: '标题1'},
        { name: 'content', type: 'String', remark: '内容2'},
        { name: 'view', type: 'Integer', remark: '浏览量3'}
      ]
    }))
    .pipe(rename('OrderDataClass.java'))
    .pipe(gulp.dest('./gulp-dist/code-gen'));
  cb();
});
```

- 获取模板文件的内容，然后变量，如上，模板文件javaClass.java的内容
关于template模板插件，可百度查看。下面的循环和变量的替换基本满足开发需求了。

```js
package com.mylike.app.finance.model;
import java.util.List;
public class <%= className %> {
    // begin loop
    <% for(var i = 0; i < 10; i++) {%>
    <li>我是列表 <%-i %></li>
    <% } %>
    // end loop
    <% attrList.map(item=> {%>
       <div>
        <span>span</span>
        <p>p label</p>
       </div>
    <% }) %>
    <% for(let i = 0; i < attrList.length; i++) {%>
       private <%= attrList[i].type %> <%= attrList[i].name %>; // <%= attrList[i].remark %>
    <% } %>
    <% if(attrList.length > 0) {%>
       attrList length is more than 0
    <% } %>
    <% if(attrList.length < 1) {%>
       attrList length is less 1
    <% } %>
    jsonData = {
    <% attrList.map(item=> {%>
        '<%= item.type %>': <%= item.name %>,
    <% }) %>
    }
    private String ordername;
    private String chargetype; // 收费类型 名字
    private String cfhandset;
    private String cfname;
    private String fchargetype; // 收费类型 值
    private String fcreatetimestr;
    private String fid;
    private String fnumber;
    private String fpresentmoney; // 赠送金额
    private String fsection;
    private String fshouldmoney1; // 付款金额，单位:元 应付金额
    private String money1; // 已付金额
    private List<ListDetail> lsDetail;
}
```