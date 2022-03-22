import { useState, useCallback } from 'react'

import lang from '../defaultLang'

export const useRequest = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const sendRequest = useCallback(
    async (method = 'GET', url, body = null, extraHeader = {}, finallyCallback = () => null) => {
      setLoading(true)
      try {
        const response = await fetch(url, {
          method,
          body: body && JSON.stringify(body),
          headers: body
            ? { 'Content-type': 'application/json', ...extraHeader }
            : { ...extraHeader },
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message.text || lang.error.badRequest)
        }
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setMessage({ text: e.message, type: 'error' })
      } finally {
        finallyCallback()
      }
    },
    []
  )
  const clearMessage = useCallback(() => setMessage({ text: '', type: '' }), [])

  return { sendRequest, loading, message, clearMessage }
}
