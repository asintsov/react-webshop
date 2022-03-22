export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTRATION = 'REGISTRATION'
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA'
export const UPDATE_USER_BASKET = 'UPDATE_USER_BASKET'
export const SAGA_UPDATE_USER_BASKET = 'SAGA_UPDATE_USER_BASKET'

export const logIn = (data) => {
  return { type: LOGIN, payload: data }
}

export const registration = (data) => {
  return { type: REGISTRATION, payload: data }
}

export const logout = () => {
  return { type: LOGOUT }
}

export const sendLoginData = (data) => {
  return { type: SEND_LOGIN_DATA, payload: data }
}

export const udpateUserBasket = (basket) => {
  return { type: UPDATE_USER_BASKET, payload: basket }
}

export const sagaUpdateUserBasket = (data) => {
  return { type: SAGA_UPDATE_USER_BASKET, payload: data }
}
