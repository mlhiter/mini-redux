function sideEffects({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

function logger({ getState, dispatch }) {
  return (action) => {
    console.log('will dispatch', action)

    const returnValue = dispatch(action)

    console.log('state after dispatch', getState())

    return returnValue
  }
}
const initialState = {
  value: 0,
}

// 更新状态的唯一方法是使用一个reducer。reducer是一个纯函数，采用当前状态和操作并生成下一个状态值。
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 }
    case 'counter/decremented':
      return { ...state, value: state.value - 1 }
    default:
      return state
  }
}

// redux模型里应该只有一个store，它负责跟踪当前状态，使用reducer更新它相应action dispatches并且通知订阅者。
const store = Redux.createStore(
  counterReducer,
  Redux.applyMiddleware(sideEffects, logger)
)

const valueEl = document.getElementById('value')

// 渲染函数：获取新状态并且更新DOM
function render() {
  const state = store.getState()
  valueEl.innerHTML = state.value.toString()
}

render()
// 使用subscribe来注册渲染函数
store.subscribe(render)

// 为按钮设置事件监听
// 单击按钮我们会分发（dispatch）适当的行为（action）到Redux的store里，它会触发下一个状态并且调用后续渲染函数，从而更新我们的视图
document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'counter/incremented' })
})

document.getElementById('decrement').addEventListener('click', function () {
  store.dispatch({ type: 'counter/decremented' })
})
