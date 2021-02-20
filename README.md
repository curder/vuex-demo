# vuex-demo

感谢 [vueschool.io - Vuex for Everyone](https://vueschool.io/courses/vuex-for-everyone) 提供学习视频。

## 安装和简单配置

```bash
yarn add vuex
```

在源码目录下创建一个 `store` 的目录，并新建一个`index.js`的文件编写 [vuex](https://vuex.vuejs.org/zh/) 相关代码。

```js
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

new Vuex.Store({
    state: { // 类似组件里的 data
        //
    },

    getters: { // 类似组件里的 computed 属性
        //
    },

    actions: { // 类似组件里的方法，在组件中使用 this.$state.dispatch 调用或使用mapActions导入方法
        //
    },

    mutations: { // 类似组件发布事件，使用 state.commit(名称) 调用 
        // 
    }
});
```

## [map相关组件绑定的辅助函数](https://vuex.vuejs.org/zh/api/#%E7%BB%84%E4%BB%B6%E7%BB%91%E5%AE%9A%E7%9A%84%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)
        
## 模块

当我们的vuex状态管理文件业务过于庞大的时候就需要将文件拆分为若干个小文件进行管理。

将相关处理逻辑放在单独的文件中放在`modules`目录下，比如`store/modules/cart.js`等。

文件的结构为：
```js
export default {
    namespaced: true,
    
    state: { // 类似组件里的 data
        //
    },

    getters: { // 类似组件里的 computed 属性
        //
    },

    actions: { // 类似组件里的方法，在组件中使用 this.$state.dispatch 调用或使用mapActions导入方法
        //
    },

    mutations: { // 类似组件发布事件，使用 state.commit(名称) 调用 
        // 
    }
}
```

此时需要注意的是
1. 组件使用map帮助函数时需要添加对应的命名空间

2. 模块之间的调用

   2.1. 如果涉及到快模块的状态访问getters属性则需要使用`rootState`，
   2.2. 如果需要调用其他模块的`mutations`事件则需要传递第三个参数`{root: true}`并添加上对应的命名空间。

关于 [vuex](https://vuex.vuejs.org/zh/api/) 的更多使用方法参考 [vuex的官网文档](https://vuex.vuejs.org/zh/guide/) 。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
