---
title: Gulp上传文件到腾讯云对象存储
sidebarDepth: 2
---

这里写了一个 Gulp 上传整个文件夹到腾讯云对象存储的任务。

## 腾讯云对象存储

腾讯云对象存储提供了文件存储的功能，个人申请可有一定的容量，简单使用基本免费。<br/>
而且可以把静态网站托管到上面。本网站就是放到对象存储的一个静态网站。<br/>
具体看<https://cloud.tencent.com/product/cos>

## 腾讯云对象存储 SDK

这个是官方的 npm 包，cos-nodejs-sdk-v5

```
yarn add cos-nodejs-sdk-v5 -d
```

## 获取文件夹下所有的文件

VuePress 构建完成后，在.vuepress 文件夹下生成了 dist 文件夹，我们把这个文件夹的内容全部上传到自己在腾讯云对象存储上建立的一个存储桶就可以了。
如果我们的存储桶配置了静态网站，那直接访问就可以看到我们的网站了。
获取 dist 下所有文件的方法：

```js
function getAllFiles(startPath) {
  let allFiles = [];
  function loopGet(dirPath) {
    const fileList = fs.readdirSync(dirPath);
    fileList.forEach(value => {
      const checkPath = path.normalize(path.join(dirPath, value));
      const stats = fs.statSync(checkPath);
      if (stats.isDirectory()) {
        loopGet(checkPath);
      } else {
        allFiles.push(path.normalize(path.join(dirPath, value)));
      }
    });
  }
  loopGet(startPath);
  return allFiles;
}
```

## 腾讯云 SDK

我们要先引入 SDK，然后填入对应的 SecretId 和 SecretKey(\*为了方便，这里使用的是最方便的方法，注意这个文件不要泄露)。<br/>
下面是上传的方法，不过我们实际使用的是经过 promise 封装的

```js
const COS = require('cos-nodejs-sdk-v5');
const cos = new COS({
  SecretId: "AK******U",
  SecretKey: "nN*****e"
});
cosObj.putObject(
  {
    Bucket: "vp-12*******15" /* 存储桶的空间名称 */,
    Region: "ap-guangzhou" /* 存储桶的所属地域 */,
    Key: value /* 在存储桶的名称 */,
    StorageClass: "STANDARD",
    Body: fs.createReadStream(path.join(startPath, value)), // 上传文件对象
    onProgress: function(progressData) {
      // console.log(JSON.stringify(progressData));
    }
  },
  function(err, data) {
    if (!err) {
      console.log(`上传成功, ${value}`);
    } else {
      console.error(`上传失败-${err}, ${value}`);
    }
  }
);
```


## 完整的gulpfile.js文件内容

```js
const gulp = require('gulp');
const COS = require('cos-nodejs-sdk-v5');
const replace = require('gulp-replace');
const fs = require('fs');
const path = require('path');

/**
 * 上传文件到腾讯云
 */
gulp.task('publish',(cb)=>{
    const cos = new COS({
        SecretId: 'AKI********U',
        SecretKey: 'nN********e'
    });
    // 获取dist的路径
    const startPath = path.normalize(path.join(__dirname, '/doc/.vuepress/dist'));
    // 获取所有的文件相对dist的路径的数组
    const fileList = getAllFiles(startPath).map(item=>{
        return item.replace(startPath, '').replace(/\\/g, '/');
    });
    // promise.all 是为了等所有上传成功后再提示Gulp任务完成
    Promise.all(fileList.map(value=>{
        return cosUpload(cos, startPath, value);
    })).then(()=>{
        cb();
    })
});


function cosUpload(cosObj, startPath, value){
    return new Promise((resolve, reject)=>{
        cosObj.putObject({
            Bucket: 'vp-1******5', /* 必须 */
            Region: 'ap-guangzhou',    /* 必须 */
            Key: value,              /* 必须 */
            StorageClass: 'STANDARD',
            Body: fs.createReadStream(path.join(startPath, value)), // 上传文件对象
            onProgress: function(progressData) {
               // console.log(JSON.stringify(progressData));
            }
        }, function(err, data) {
            //console.log(err || data);
            if(!err){
                console.log(`上传成功, ${value}`);
                resolve();
            }else {
                console.error(`上传失败-${err}, ${value}`);
                reject();
            }
        });
    });
}

function getAllFiles(startPath){
    let allFiles = [];
    function loopGet(dirPath){
        const fileList = fs.readdirSync(dirPath);
        fileList.forEach((value)=>{
            const checkPath = path.normalize(path.join(dirPath, value));
            const stats = fs.statSync(checkPath);
            if(stats.isDirectory()){
                loopGet(checkPath);
            } else {
                allFiles.push(path.normalize(path.join(dirPath, value)));
            }
        });
    }
    loopGet(startPath);
    return allFiles;
}

```