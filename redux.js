function createStore(reducer) {
  // 初始化状态
  let state = reducer(undefined, { type: '__INIT__' })
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

const Redux = {
  createStore,
}
