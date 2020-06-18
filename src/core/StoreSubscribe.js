import {isEqual} from "@core/utils";

export default class StoreSubscribe {
  constructor(store) {
    this.store = store
    this.prevState = {}
    this.sub = null
  }

  subscribeComponents(components) {
    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(state[key], this.prevState[key])) {
          components.forEach((component) => {
            if (component.listSubscribe.includes(key)) {
              component.changeSubscribe(state)
            }
          })
        }
      })
      this.prevState = {...state}
    })
  }

  unsubscribeFromState() {
    this.sub()
  }
}