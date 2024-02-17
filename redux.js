// reducer：传入初始状态和计算逻辑
// enhancer：传入增强函数，比如中间件
function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  // 初始化状态
  let state = reducer(undefined, { type: '__INIT__' })
  // 初始化监听器列表
  let listeners = []
  return {
    dispatch: (action) => {
      state = reducer(state, action)
      // 更改状态后调用所有监听器
      listeners.forEach((listener) => listener())
    },
    getState: () => state,
    subscribe: (listener) => {
      listeners.push(listener)
    },
  }
}

// 应用中间件
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer)
    const middlewareApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const dispatchChain = middlewares.map((middleware) =>
      middleware(middlewareApi)
    )
    const composedMiddleware = compose(...dispatchChain)
    const dispatch = composedMiddleware(store.dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}

// lib: compose函数
function compose(...functions) {
  if (functions.length === 0) {
    return (arg) => arg
  }
  return functions.reduce((a, b) => (arg) => a(b(arg)))
}

const Redux = {
  applyMiddleware,
  compose,
  createStore,
}
