## Tutorial

learn from this website->[build your own redux](https://nytimes.github.io/oak-byo-react-prosemirror-redux/post/build-your-own-redux/)

This is a tutorial project.

Build your own redux.

And then I'll implement other features that isn’t implemented in the tutorial.

### Principle

#### 1，Basic knowledge

redux维护一个store，store里存储数据。

怎么改变数据呢？->通过触发action并用reducer计算出新状态。

我们通过调度函数(dispatch)来书写调度逻辑；

通过订阅函数（subscribe）来订阅监听器（监听器就是在每次状态更新后都会调用的函数）；

通过获取状态函数（getState）来获取最新的状态。

**Advanced：**

增强函数(enhancer)：最典型的就是applyMiddleware，这个函数对dispatch进行封装，达到中间件的效果。

#### 2，The exposed api

##### 2.1 createStore

```js
createStore(reducer,enhancer)=>{
 return {
   getState,
   dispatch,
   subscribe
 } 
}
```

- 参数
  - reducer：(prevState,action)=>newState。这是一个定义更新数据逻辑的函数。
  - enhancer：包裹器函数，用来增强redux能力，比如最常见的**applyMiddleware** 来给redux添加中间件。
- 返回值：store对象
  - getState：()=>state，返回最新状态值。**获取函数**，用来获取最新的state值。
  - dispatch：(action)=>void，接收action命令通过reducer得到newState并更新现有state（**同时执行所有监听器函数**）。**调度函数**，用来更新state值。
  - subscribe：(listener)=>void，接收监听函数listener。**订阅函数**，注册监听器到redux上，在每一次状态更新之后都会执行。

##### 2.2 applyMiddleware

```js
applyMiddleware(...middlewares){
  return {
    ...store,
    dispatch
  }
}
```

- 参数
  - …middlewares：n个中间件函数
    - middleware({getState,dispatch})=>(next)=>(action)=>{…some actions}
- 返回值
  - store对象解构
  - dispatch：这里的dispatch是middleware中间件包裹处理后的dispatch

#### 3，The used knowledge

closure;

compose function;

that’s all we need to know.😀

