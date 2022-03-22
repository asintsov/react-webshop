import React, { useState } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { routes } from '../../../config'
import {
  sendLoginData,
  logout,
  setSearchString,
  changeTheme,
  setMessage,
} from '../../../redux/actions'
import {
  Logo,
  LoginForm,
  LoginButton,
  LogoutButton,
  SettingsBar,
  BasketButton,
  SettingsButton,
  SearchInput,
  CatalogueBar,
  MessageBox,
} from '../../molecules'

const MainMenuWrapper = styled.div`
  margin: 0 auto;
  width: inherit;
  background-color: rgb(${({ theme }) => theme.header});
  position: fixed;
  z-index: 3;
`
const ButtonsBox = styled.div`
  heght: 100%;
  width: 240px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  @media (max-width: 360px) {
    heght: 55px;
    width: 100%;
    margin: 0;
    justify-content: space-evenly;
  }
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DesktopViewBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 360px) {
    display: none;
  }
`
const MobileViewBox = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 361px) {
    display: none;
  }
`
const LogoAndSearchBox = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MainMenu = ({ isLoggedIn, message, basketLength }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [collapsed, setCollapsed] = useState({
    navBar: true,
    loginBar: true,
    settingsBar: true,
    loginForm: true,
    registrationForm: true,
    message: true,
  })
  const [search, setSearch] = useState('')

  function setItemCollapsed(item) {
    const temp = Object.assign({}, collapsed)
    for (let key in temp) {
      if (key === item) temp[key] = !temp[key]
      else temp[key] = true
    }
    setCollapsed(temp)
  }
  function collapseAll() {
    const temp = Object.assign({}, collapsed)
    for (let key in temp) temp[key] = true
    setCollapsed(temp)
  }

  function handleChangeTheme() {
    dispatch(changeTheme())
    collapseAll()
  }

  async function handleSubmitLogin(data) {
    dispatch(sendLoginData(data))
    collapseAll()
  }

  function handleClickLogout() {
    dispatch(logout())
    dispatch(setMessage({ text: 'See you later!', type: 'info' }))
  }

  function handleClickLogin() {
    setItemCollapsed('loginForm')
  }

  function handleClickSettings() {
    setItemCollapsed('settingsBar')
  }

  function handleSubmitSearch(event) {
    event.preventDefault()
    dispatch(setSearchString(search))
    setSearch('')

    history.push(routes.search)
  }

  return (
    <MainMenuWrapper>
      <DesktopViewBox>
        <Logo />
        <SearchBox >
          <CatalogueBar />
          <SearchInput
            value={search}
            handleSubmit={handleSubmitSearch}
            handleChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <ButtonsBox>
          <Link to={routes.basket}>
            <BasketButton onClick={collapseAll} count={basketLength} />
          </Link>
          {isLoggedIn ? (
            <LogoutButton onClick={handleClickLogout} />
          ) : (
            <LoginButton onClick={handleClickLogin} />
          )}
          <SettingsButton onClick={handleClickSettings} />
        </ButtonsBox>
        <SettingsBar collapsed={collapsed.settingsBar} handleChangeTheme={handleChangeTheme} />
        <LoginForm
          collapsed={collapsed.loginForm}
          handleSubmit={handleSubmitLogin}
          handleCancel={collapseAll}
        />
      </DesktopViewBox>
      <MobileViewBox>
        <LogoAndSearchBox>
          <Logo />
          <SearchBox>
            <SearchInput
              value={search}
              handleSubmit={handleSubmitSearch}
              handleChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
        </LogoAndSearchBox>
        <ButtonsBox>
          <CatalogueBar />
          <Link to={routes.basket}>
            <BasketButton onClick={collapseAll} />
          </Link>
          {isLoggedIn ? (
            <LogoutButton onClick={handleClickLogout} />
          ) : (
            <LoginButton onClick={handleClickLogin} />
          )}
          <SettingsButton onClick={handleClickSettings} />
        </ButtonsBox>
        <SettingsBar collapsed={collapsed.settingsBar} handleChangeTheme={handleChangeTheme} />
        <LoginForm
          collapsed={collapsed.loginForm}
          handleSubmit={handleSubmitLogin}
          handleCancel={collapseAll}
        />
      </MobileViewBox>
      <MessageBox message={message} />
    </MainMenuWrapper>
  )
}

MainMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  router: PropTypes.element,
  message: PropTypes.object,
  basketLength: PropTypes.number,
}

export const ReduxConnectedMainMenu = connect((state) => ({
  isLoggedIn: state.user.isLoggedIn,
  message: state.message.message,
  basketLength: state.items.basketLength,
}))(MainMenu)
