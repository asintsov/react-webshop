import { LOGIN, REGISTRATION, LOGOUT } from '../actions/userActions'

function putToLocalStorage(name, data) {
  window.localStorage.setItem(name, JSON.stringify(data))
}

const defaultState = { isLoggedIn: false, data: {} }

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      if (!action.payload.token) {
        return { ...state, isLoggedIn: false, data: {} }
      }
      putToLocalStorage('basket', action.payload.basket)
      return {
        ...state,
        isLoggedIn: true,
        data: { login: action.payload.login, token: action.payload.token },
      }
    }
    case REGISTRATION:
      if (!action.payload.token) return { ...state, isLoggedIn: false, data: {} }
      return { ...state, isLoggedIn: true, data: action.payload }
    case LOGOUT:
      return { ...state, isLoggedIn: false, data: {} }
    default:
      return state
  }
}
