import React from 'react'

import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { LoadingIcon } from '../../icons/icons'

const LoadingAnimationWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -100px;
  z-index: 1;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
  svg {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 360px) {
    margin: -25px 0 0 -25px;
    svg {
      width: 50px;
      height: 50px;
    }
  }
  @media (min-width: 361px) and (max-width: 768px) {
    margin: -80px 0 0 -80px;
    svg {
      width: 160px;
      height: 160px;
    }
  }
`

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const AnimatedLoadingIcon = styled(LoadingIcon)`
  animation: ${rotate} 0.7s linear infinite;
`

export const LoadingAnimation = ({ collapsed }) => {
  return (
    <LoadingAnimationWrapper collapsed={collapsed}>
      <AnimatedLoadingIcon />
    </LoadingAnimationWrapper>
  )
}

LoadingAnimation.propTypes = { collapsed: PropTypes.bool }
