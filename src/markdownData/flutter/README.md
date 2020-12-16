---
title: Flutter简单笔记
---

## Flutter中文网学习
这个GitBook的电子书是很好的学习资料。<br/>
[Flutter中文网](https://book.flutterchina.club)


## Flutter安装
只记录Windows系统的安装。

- 获取Flutter SDK
下载地址：[去flutter官网下载其最新可用的安装包，下载地址：https://flutter.dev/docs/development/tools/sdk/releases](去flutter官网下载其最新可用的安装包，下载地址：https://flutter.dev/docs/development/tools/sdk/releases);

将安装包zip解压到你想安装Flutter SDK的路径（如：C:\src\flutter；注意，不要将flutter安装到需要一些高权限的路径如C:\Program Files\）。

在Flutter安装目录的flutter文件下找到flutter_console.bat，双击运行并启动flutter命令行，接下来，你就可以在Flutter命令行运行flutter命令了。

运行下面的命令，查看是否还有要安装的内容：

```
flutter doctor
```

- 设置环境变量
如果想其他地方都可以运行flutter_console，设置一个安装目录的bin 即可

## Android Studio安装
正常下载安装，然后设置一个虚拟机。这里主要是有可能会提示HAXM安装失败，原因是因特尔和微软的虚拟化技术在系统里面起冲突了。
一个是要保证开启系统的虚拟化功能，然后关闭微软的Hyper-V虚拟化技术。具体操作可以百度。

## VScode插件安装
正常其实是可以用Android Studio来开发了，不过使用VScode也可以。搜索Flutter的相关插件，安装重启即可。
右键lib/main.dart文件，选择Start Debugging。稍等即可启动模拟器进行开发啦。
