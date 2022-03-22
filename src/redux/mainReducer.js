import { combineReducers } from 'redux'

import { userReducer } from './reducers/userReducer'
import { itemsReducer } from './reducers/itemsReducer'
import { messageReducer } from './reducers/messageReducer'
import { settingsReducer } from './reducers/settingsReducer'

export default combineReducers({
  user: userReducer,
  settings: settingsReducer,
  items: itemsReducer,
  message: messageReducer,
})
