# gotin-event-mobile 移动版.

## 启动方法

```
安装依赖：npm install
启动devServer(默认端口 8080) ：npm run serve
启用devServer(指定端口如 8000) ：npm run serve -- --port 8000
生产环境编译：npm run build
```

## 其他

###### 1、vue.config.js 设置了 devServer 的代理，在测试环境中将访问 /api 的请求都指向到了 http://localhost:8001，日后调试可以做

相应更改。

###### 2、git 提交需要指定类别，格式为：{类别}: {Message}，允许类别如下：

```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style：格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

###### 3、脚手架使用

(1) 创建 store 的 modules 详见 services/skel.js

```
npm run skel module {moduleName}
```

###### 4、通用方法

(1) 关于 cookie 方法的使用可以参考 js-cookie (https://github.com/js-cookie/js-cookie)

(2) 通用的数组对象等的处理方法可以使用 lodash 但是引入的时候需要只引入自己需要的 例如：import isArray from
'lodash/isArray'
