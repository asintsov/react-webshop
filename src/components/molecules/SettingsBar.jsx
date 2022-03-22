import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import lang from '../../defaultLang'

const SettingsBarWrapper = styled.div`
  z-index: 1;
  width: 240px;
  min-height: 60px;
  position: absolute;
  top: 110px;
  right: calc(50% - 1px);
  margin: 0 -629px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: right;
  background-color: rgb(${({ theme }) => theme.header});
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  transition: all 0.2s ease-out;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  @media (max-width: 360px) {
    width: 130px;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid rgb(${({ theme }) => theme.lightFont});
    top: 128px;
    right: 50%;
    margin: 0 -170px 0 0;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 240px;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid rgb(${({ theme }) => theme.lightFont});
    top: 110px;
    right: 50%;
    margin: 0 -375px 0 0;
  }
`
const StyledButton = styled.button`
  margin: 0 10px;
  background: none;
  border: none;
  padding: 5px 5px;
  margin: 0 0 5px 0;
  border-radius: 3px;
  height: 30px;
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: inherit;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 360px) {
    font-weight: 500;
  }
`

export const SettingsBar = (props) => {
  return (
    <SettingsBarWrapper collapsed={props.collapsed}>
      <StyledButton onClick={props.handleChangeTheme}>{lang.settingsBar.changeColor}</StyledButton>
      <StyledButton onClick={props.handleChangeTheme}>Сменить язык</StyledButton>
    </SettingsBarWrapper>
  )
}

SettingsBar.propTypes = { handleChangeTheme: PropTypes.func, collapsed: PropTypes.bool }
