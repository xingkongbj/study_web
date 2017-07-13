# Vuex

> Vuex [https://vuex.vuejs.org/zh-cn/intro.html](https://vuex.vuejs.org/zh-cn/intro.html)

## 创建 store

    // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
    const SOME_MUTATION = 'SOME_MUTATION';
    const store = new Vuex.Store({
        // 状态
        // 不能直接修改
        state: {
            count: 0,
            todos: [
                { id: 1, text: '...', done: true },
                { id: 2, text: '...', done: false }
            ]
        },
        // 派生状态，由 state 经过操作后使用，如筛选
        getters: {
            doneTodos: (state, getters, rootState, rootGetters) => {
                // state,        等同于 store.state, 若在模块中则为局部状态
                // getters,      等同于 store.getters, 若在模块中则为局部状态
                // rootState     等同于 store.state, 只存在于模块中
                // rootGetters     等同于 store.getters, 只存在于模块中
                return state.todos.filter(todo => todo.done);
            }
        },
        // 同步修改状态
        // 状态改变的唯一方法
        // 不能包含异步操作
        // 若在模块中，则只能改变局部状态
        mutations: {
            increment (state, payload) {
                // state,        等同于 store.state 始终表示局部状态
                // payload       可选，store.commit 执行时传入的额外参数
                state.count += payload. amount;
            },
            // 使用常量替代 Mutation 事件类型
            [SOME_MUTATION] (state, payload) {
                state.count += payload. amount;
            }
        },
        // 异步修改状态
        // 提交的是 mutation，而不是直接变更状态
        // 可以包含任意异步操作
        actions: {
            increment (context, payload) {
                // context.state,     等同于 store.state, 若在模块中则为局部状态
                // context.getters,    等同于 store.getters, 若在模块中则为局部状态
                // context.commit,    等同于 store.commit
                // context.dispatch,  等同于 store.dispatch
                // context.rootState, 等同于 store.state, 只存在于模块中
                // context.rootGetters, 等同于 store.getters, 只存在于模块中
                // payload            可选，store.dispatch 执行时传入的额外参数
                context.commit('increment');
            }
        }
    });
    
## 外部调用
    
    // 外部调用或触发
    store.state.cont;
    store.getters.doneTodos;
    store.commit('increment', {
        amount: 10
    });
    store.commit({
        type: 'increment',
        amount: 10
    });
    store.dispatch({
        type: 'increment',
        amount: 10
    });

    
## 注入 store
    
    // 父组件
    const app = new Vue({
        el: '#app',
        // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
        store,
        components: { Counter },
        template: `
            <div class="app">
                <counter></counter>
            </div>
        `
    });
    
    // 子组件
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            // 父组件绑定 store 后，子组件能通过 this.$store 访问 store 所有信息
            // this.$store 同 store
            count () {
                return this.$store.state.count
            },
            doneTodos () {
                return this.$store.getters.doneTodos
            }
        }
    };
    
## 辅助函数
    
    // 辅助函数
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            ...mapState({
                // 箭头函数可使代码更简练
                count: state => state.count,
    
                // 传字符串参数 'count' 等同于 'state => state.count'
                countAlias: 'count',
    
                // 为了能够使用 'this' 获取局部状态，必须使用常规函数
                countPlusLocalState (state) {
                    return state.count + this.localCount
                }
            }),
            ...mapGetters({
                // 映射 this.doneCount 为 store.getters.doneTodosCount
                doneCount: 'doneTodosCount'
            }),
            ...mapMutations({
                // 映射 this.add() 为 this.$store.commit('increment')
                add: 'increment' 
            })
        },
        methods: {
            ...mapActions({
                // 映射 this.add() 为 this.$store.dispatch('increment')
                add: 'increment'
            })
        }
    };
    
    // 辅助函数简写
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            ...mapState([
                // 映射 this.count 为 store.state.count
                'count'
            ]),
            ...mapGetters([
                // 映射 this.doneCount 为 store.getters.doneTodosCount
                'doneTodosCount'
            ]),
            ...mapMutations([
                // 映射 this.increment() 为 this.$store.commit('increment')
                'increment' 
            ])
        },
        methods: {
            ...mapActions([
                // 映射 this.increment() 为 this.$store.dispatch('increment')
                'increment' 
            ])
        }
    };
    
## Modules

    const moduleA = {
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... }
    };
    
    const moduleB = {
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... }
    };
    
    const store = new Vuex.Store({
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... },
        modules: {
            a: moduleA,
            b: moduleB
        }
    });
    
    // 访问方式
    // 除了 state 其他直接可以访问，注册在全局命名空间。不能重名，否则会执行两次
    store.state.a // -> moduleA 的状态
    store.state.a.count;
    
## 命名空间

    const store = new Vuex.Store({
        modules: {
            account: {
                // 设置命名空间模块
                // 它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
                namespaced: true,
                // 模块内容（module assets）
                // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
                state: { ... }, 
                getters: {
                    isAdmin () { ... } // -> store.getters['account/isAdmin'];
                },
                actions: {
                    login () { ... } // -> store.dispatch('account/login');
                },
                mutations: {
                    login () { ... } // -> store.commit('account/login');
                },
                // 嵌套模块
                modules: {
                    // 继承父模块的命名空间
                    myPage: {
                        state: { ... },
                        getters: {
                            profile () { ... } // -> store.getters['account/profile'];
                        }
                    },
                    // 进一步嵌套命名空间
                    posts: {
                        namespaced: true,
                        state: { ... },
                        getters: {
                            popular () { ... } // -> store.getters['account/posts/popular'];
                        }
                    }
                }
            }
        }
    });

## 命名空间内部访问

    const store = new Vuex.Store({
        modules: {
            foo: {
                namespaced: true,
                getters: {
                    // 在这个模块的 getter 中，`getters` 被局部化了
                    // 你可以使用 getter 的第四个参数来调用 `rootGetters`
                    someGetter (state, getters, rootState, rootGetters) {
                        getters.someOtherGetter // -> 'foo/someOtherGetter'
                        rootGetters.someOtherGetter // -> 'someOtherGetter'
                    },
                    someOtherGetter: state => { ... }
                },
                actions: {
                    // 在这个模块中， dispatch 和 commit 也被局部化了
                    // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
                    someAction ({ dispatch, commit, getters, rootGetters }) {
                        getters.someGetter // -> 'foo/someGetter'
                        rootGetters.someGetter // -> 'someGetter'
                        dispatch('someOtherAction') // -> 'foo/someOtherAction'
                        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
                        commit('someMutation') // -> 'foo/someMutation'
                        commit('someMutation', null, { root: true }) // -> 'someMutation'
                    },
                    someOtherAction (ctx, payload) { ... }
                }
            }
        }
    });
    
## 命名空间绑定函数

    // 子组件
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            ...mapState({
                a: state => state.some.nested.module.a,
                b: state => state.some.nested.module.b
            })
        },
        methods: {
            ...mapActions([
                'some/nested/module/foo',
                'some/nested/module/bar'
            ])
        }
    };
    
    // 子组件
    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            ...mapState('some/nested/module', {
                a: state => state.a,
                b: state => state.b
            })
        },
        methods: {
            ...mapActions('some/nested/module', [
                'foo',
                'bar'
            ])
        }
    };
