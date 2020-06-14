export const createStore = (reducer, initState = {}) => {
  let state = reducer(initState, {type: "__INIT__"})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)

      return () => {
        listeners = listeners.filter(l => l !== fn)
      }
    },
    dispatch(action) {
      state = reducer(state, action)
      listeners.forEach(l => l(state))
    },
    getState() {
      return state
    }
  }
}