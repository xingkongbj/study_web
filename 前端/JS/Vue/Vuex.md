# Vuex

> Vuex [https://vuex.vuejs.org/zh-cn/intro.html](https://vuex.vuejs.org/zh-cn/intro.html)

## 创建 store

    // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
    const SOME_MUTATION = 'SOME_MUTATION'
    const store = new Vuex.Store({
        // 状态
        state: {
            count: 0,
            todos: [
                { id: 1, text: '...', done: true },
                { id: 2, text: '...', done: false }
            ]
        },
        // 派生状态，由 state 经过操作后使用，如筛选
        getters: {
            doneTodos: (state, getters, rootState) => {
                // state,        等同于 store.state, 若在模块中则为局部状态
                // getters,      等同于 store.getters
                // rootState     等同于 store.state, 只存在于模块中
                return state.todos.filter(todo => todo.done);
            }
        },
        // 同步修改状态
        // 状态改变的唯一方法
        // 不能包含异步操作
        // 若在模块中，则只能改变局部状态
        mutations: {
            increment (state, payload) {
                // state,        等同于 store.state
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
                // context.rootState, 等同于 store.state, 只存在于模块中
                // context.commit,    等同于 store.commit
                // context.dispatch,  等同于 store.dispatch
                // context.getters    等同于 store.getters
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
    })
    
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
    }
    
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
    }
    
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
    }
    
## Modules
    // 只能嵌套一层 Modules ，要求 store 中不能有 Modules
    const moduleA = {
        state: { ... },
        mutations: { ... },
        actions: { ... },
        getters: { ... }
    }
    
    const moduleB = {
        state: { ... },
        mutations: { ... },
        actions: { ... }
    }
    
    const store = new Vuex.Store({
        modules: {
            a: moduleA,
            b: moduleB
        }
    })
    
    // 访问方式
    // 除了 state 其他直接可以访问，不能重名，否则会执行两次
    store.state.a // -> moduleA 的状态
    store.state.a.count;