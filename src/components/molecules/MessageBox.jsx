import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { setMessage } from '../../redux/actions'
import { MESSAGE_BOX_ANIMATION_DURATION } from '../../config'

const disappearance = keyframes`from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
  `
const MessageBoxWrapper = styled.div`
  width: 200px;
  height: 100px;
  position: fixed;
  top: 110px;
  right: 50%;
  margin: 0 -620px 0 0;
  padding: 10px;
  align-items: center;
  z-index: 1;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'flex')};
  background-color: ${({ type, theme }) =>
    type === 'info' || type === '' ? `rgb(${theme.lightFont})` : 'red'};
  color: ${({ type, theme }) => (type === 'info' ? `rgb(${theme.darkFont})` : 'white')};
  border: 1px solid rgb(${({ theme }) => theme.darkFont});
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  white-space: normal;
  animation: ${disappearance} ${() => MESSAGE_BOX_ANIMATION_DURATION / 1000}s ease-in 1;
  animation-fill-mode: forwards;
  @media (max-width: 360px) {
    width: 100px;
    height: 50px;
    top: 130px;
    margin: 0 -130px 0 0;
    padding: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    margin: 0 -300px 0 0;
  }
`

export const MessageBox = ({ message }) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    if (message.text) setCollapsed(false)
  }, [message])

  useEffect(() => {
    if (message.text)
      setTimeout(() => {
        setCollapsed(true)
      }, MESSAGE_BOX_ANIMATION_DURATION)
  }, [message])

  useEffect(() => {
    if (collapsed) dispatch(setMessage({ text: '', type: '' }))
  }, [collapsed])

  return (
    <MessageBoxWrapper collapsed={collapsed} type={message.type}>
      {message.text}
    </MessageBoxWrapper>
  )
}

MessageBox.propTypes = { message: PropTypes.object }
