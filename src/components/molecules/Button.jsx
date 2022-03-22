import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  height: 65px;
  width: 70px;
  font-size: inherit;
  padding: 3px 3px;
  border-radius: 3px;
  border: none;
  background: none;
  color: rgb(${({ theme }) => theme.icons});
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
    font-weight: 600;
  }
  &:focus {
    outline: none;
  }
  svg {
    width: 35px;
    height: 35px;
  }
  @media (max-width: 360px) {
    height: 55px;
    width: 55px;
    svg {
      width: 32px;
      height: 32px;
    }
  }
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  position: relative;
`

export const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <ContentWrapper>
        {props.icon}
        {props.title}
        {children}
      </ContentWrapper>
    </StyledButton>
  )
}

Button.propTypes = { icon: PropTypes.element, title: PropTypes.string, children: PropTypes.element }
