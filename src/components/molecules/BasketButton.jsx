import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import lang from '../../defaultLang'
import { Button } from './Button'
import { BasketIcon } from '../../icons/icons'

const ItemsCount = styled.div`
  display: ${({ count }) => (count > 0 ? 'inline' : 'none')};
  position: absolute;
  top: -6px;
  left: 45px;
  height: 15px;
  width: 15px;
  padding: 2px;
  z-index: 1;
  background: none;
  border-radius: 12px;
  border: 2px solid rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: 13px;
  font-weight: 600;
  text-align: center;
`

export const BasketButton = ({ count, ...props }) => {
  return (
    <Button {...props} icon={<BasketIcon />} title={lang.basketButton.title}>
      <ItemsCount count={count}>{count}</ItemsCount>
    </Button>
  )
}

BasketButton.propTypes = { count: PropTypes.number }
