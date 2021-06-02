# abc project

### 全局安装ng-cli脚手架（已安装可以跳过）
##### tyarn方式安装需要配置环境变量，通过 tyarn global bin 查看路径

```bash
$ npm i create-ng-cli -g
$ tyarn global add create-ng-cli (需要配置yarn环境变量，通过 tyarn global bin 查看路径)
```

### 安装依赖,

```bash
$ tyarn
```

### 启动服务,

```bash
$ ng-cli start 或者 tyarn start
```

### 启动服务+代理工具（需要配置ngproxy.ini）,

```bash
$ ng-cli ps
```

### 打包发布（不需要layout菜单）

```bash
$ ng-cli build
```

### 打包发布（完整）

```bash
$ tyarn build
```

### 创建一个路由页面，pageName为相对src/pages下的路径
##### -dva选项 自动配置model
##### -d选项 开发时不需要在左边菜单中显示

```bash
$ ng-cli g p [pageName]
$ ng-cli g p [pageName] -dva -d
```

### 创建一个组件，pageName为相对src/pages下的路径
##### -dva选项自动配置model

```bash
$ ng-cli g c [pageName]
$ ng-cli g c [pageName] -dva
```
