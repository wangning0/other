##NodeJs构建项目前后端分离脚手架

在前端我们的采用的基本项目结构一般是这样的

![](./screenshot/client.png)

而用`express`框架构建的项目，一般是这样的

![](./screenshot/express.png)

利用该脚手架后，可以直接通过`gulp`直接将`client`里面的内容调用到`server`中。


但是css/js/images的路由依然要更改。