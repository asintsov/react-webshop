import { SET_MESSAGE } from '../actions/messageActions'

const defaultState = { message: { text: '', type: '' } }
export const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload }
    default:
      return state
  }
}
