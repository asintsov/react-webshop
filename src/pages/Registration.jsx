import React from 'react'

import { useDispatch } from 'react-redux'

import { REGISTRATION_URL } from '../config'
import { useRequest } from '../hooks/request.hook'
import { RegistrationForm } from '../components/organisms'
import { registration, setMessage } from '../redux/actions'

export const Registration = () => {
  const dispatch = useDispatch()
  const { sendRequest, message } = useRequest()

  function handleSubmit(data) {
    sendRequest('POST', REGISTRATION_URL, data).then((resData) => {
      if (resData) {
        dispatch(registration({ login: resData.login, token: resData.token }))
      }

      dispatch(setMessage(message))
    })
  }
  return (
    <div>
      <RegistrationForm handleSubmit={handleSubmit} />
    </div>
  )
}
