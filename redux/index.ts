import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducer'

const sagaMiddleware = createSagaMiddleware()
// , applyMiddleware(sagaMiddleware)
let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(reducers, composeEnhancers())

// sagaMiddleware.run();
export default store
