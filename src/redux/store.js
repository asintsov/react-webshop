import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import mainReducer from './mainReducer'
import { watchSendLoginData } from './saga'

const saga = createSagaMiddleware()
export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(logger, saga)))
saga.run(watchSendLoginData)
