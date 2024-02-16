const initialState = {
  value: 0,
}

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

const store = Redux.createStore(counterReducer)

const valueEl = document.getElementById('value')

function render() {
  const state = store.getState()
  valueEl.innerHTML = state.value.toString()
}

render()
store.subscribe(render)

document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'counter/incremented' })
})

document.getElementById('decrement').addEventListener('click', function () {
  store.dispatch({ type: 'counter/decremented' })
})
