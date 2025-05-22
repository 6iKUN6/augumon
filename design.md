## 基于 nuxt+go 的 ai 设计器

技术选型
前端：nuxt+unocss+leaferjs(canvas)+arco(组件库)
https://www.leaferjs.com/ui/guide/
后端：gin+gorm(nunu 模板)

目标：
实现一个 canvas 的图片或者海报设计器，除了基本的画图功能外，还是简单的用户功能和社区功能。
在此基础上加入一些 ai 的模块。
例如：leafer

1.类似于 cursor 的 agent 画图(最小粒度是 leafer 的节点)，类似于 cursor 的 ai 编码功能，不是传统的 ai 直接生成图片，而是在前端设计器上的可编辑的节点。使用 mcp+前端 tools(操作 leafer 的 api)，然后后端搭建 mcp-server，根据 prompt 提示词，选出对应应该执行的单个或者多个 api，并返回参数，在前端执行。

2.传统的文生图

3.一个 ai 助手，提供设计建议

4.同一个项目，协同编辑
