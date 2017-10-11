# Vue Router

> Vue Router [https://router.vuejs.org/zh-cn/essentials/getting-started.html](https://router.vuejs.org/zh-cn/essentials/getting-started.html)

目录

- [简单应用](#简单应用)
- [动态路由匹配](#动态路由匹配)
- [嵌套路由](#嵌套路由)
- [编程式的导航](#编程式的导航)
- [命名路由](#命名路由)
- [命名视图](#命名视图)
- [重定向 和 别名](#重定向-和-别名)
- [向路由组件传递 props](#向路由组件传递-props)
- [HTML5 History 模式](#html5-history-模式)

## 简单应用

```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
    <h1>Hello App!</h1>
    <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>

<script>
    // 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

    // 1. 定义（路由）组件。
    // 可以从其他文件 import 进来
    const Foo = { template: '<div>foo</div>' };
    const Bar = { template: '<div>bar</div>' };

    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。
    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ];

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数, 不过先这么简单着吧。
    const router = new VueRouter({
        routes // （缩写）相当于 routes: routes
    });

    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app = new Vue({
        router
    }).$mount('#app');

    // 现在，应用已经启动了！
</script>
```

## 动态路由匹配

```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
});
```

## 嵌套路由

```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
};

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
});
```

## 编程式的导航

```
const userId = 123;
// 字符串
router.push('home');
// 对象
router.push({ path: 'home' });
router.push({ path: `/user/${userId}` }); // -> /user/123
// 命名的路由
router.push({ name: 'user', params: { userId }}); // -> /user/123
// 这里的 params 不生效，因为存在 path
router.push({ path: '/user', params: { userId }}); // -> /user

// router.replace 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
```

## 命名路由

```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
});

<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
// 等同如下代码
router.push({ name: 'user', params: { userId: 123 }});
```

## 命名视图

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
});
```

## 重定向 和 别名

```
// 重定向 当用户访问 /a 时，URL 将会被替换成 /b，然后匹配路由为 /b。
// 从 /a 重定向到 /b
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
});
// 目标是一个命名的路由
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
});
// 目标是一个方法
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
});

// 别名 当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
});
```

## 向路由组件传递 props

```
// 使用 props 解耦
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
};
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加props选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
});

// 对象模式
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
});

// 函数模式
// Url: /search?q=vue 会将 {query: "vue"} 作为属性传递给SearchUser组件。
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
});
```

## HTML5 History 模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。用浏览器刷新页面时，会从服务器重新获取数据。
