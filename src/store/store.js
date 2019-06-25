import { createStore } from 'redux'

import state from './reducers/index'

const store = createStore(state)

export default store;