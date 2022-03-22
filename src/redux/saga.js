import { takeEvery, put, call } from 'redux-saga/effects'

import { LOGIN_URL } from '../config'
import { setMessage } from './actions/messageActions'
import { refreshBasketLength } from './actions/itemsActions'
import { logIn, SEND_LOGIN_DATA } from './actions/userActions'

async function sendLogin(data) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    body: data && JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  })
  return response.json()
}

function* workerSendLoginData(action) {
  const resData = yield call(sendLogin, action.payload)
  yield put(
    logIn(
      resData.login && resData.token
        ? { login: resData.login, token: resData.token, basket: resData.basket }
        : {}
    )
  )
  yield put(setMessage(resData.message.text ? { ...resData.message } : { text: '', type: '' }))
  yield put(refreshBasketLength())
}

export function* watchSendLoginData() {
  yield takeEvery(SEND_LOGIN_DATA, workerSendLoginData)
}
