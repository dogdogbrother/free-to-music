## 项目能做什么？
* 上传本地的音乐文件到服务器上，并自动解析音乐文件的歌曲名，专辑歌手，封面等信息。
* 可以搜索我们上传的服务器的歌曲，也可以搜索网易云的歌曲。
* 对双平台的资源轻度整合，可以点击喜欢后，从我的喜欢中找到。
* 提供简单的播放器，上下一曲、播放模式、进度条、音量控制。

## 运行项目
连接线上服务器:
```
npm start
```
连接本地服务器:
```
npm run dev
```
打包:
```
npm run build
```

## 后端支持
* [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供网易云音乐接口。
* [本地服务的github](https://github.com/dogdogbrother/zzmusic-node)
* 需要安装redis和mysql,ngxin支持 `/api` 转发3009端口， `/wyapi`转发网易云音乐接口，默认3000端口。
* 文件资源端口3003。

## TUDO待完成的优化有功能
1. 因为歌曲进度条写的有问题，性能有欠缺，稍后优化。
2. 补齐后端的解析歌曲后的歌词，前端的form里面补上。
3. 用侧边抽屉的形式完成歌词内容。