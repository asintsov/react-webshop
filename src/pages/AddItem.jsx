import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { ADD_ITEM_URL } from '../config'
import { useRequest } from '../hooks/request.hook'
import { AddItemForm } from '../components/organisms'
import { setMessage } from '../redux/actions/messageActions'

export const AddItem = () => {
  const { sendRequest, message } = useRequest()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMessage(message))
  }, [message])

  function handleSubmit(data) {
    sendRequest('POST', ADD_ITEM_URL, data)
  }

  return (
    <div>
      <AddItemForm handleSubmit={handleSubmit} />
    </div>
  )
}
