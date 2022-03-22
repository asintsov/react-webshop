import React from 'react'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { pages } from '../../../config'

const NavBarWrapper = styled.div`
  margin: 0 auto;
  width: inherit;
  height: 30px;
  background-color: rgb(${({ theme }) => theme.header});
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  z-index: 2;
  padding: 80px 0 0 0;
  @media (max-width: 360px) {
    bottom: 0;
    padding: 0 0 0 0;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  width: 150px;
  max-height: 18px;
  margin: 0 10px;
  background: none;
  border: none;
  padding: 5px 5px;
  border-radius: 3px;
  height: 30px;
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: inherit;
  font-weight: 600;
  text-align: center;
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 360px) {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    padding: 2px 2px;
    &:hover {
      background: none;
    }
  }
`

export const NavBar = () => {
  return (
    <NavBarWrapper>
      {pages.map((page) => {
        return page.onNavBar ? (
          <StyledLink key={page.id} to={page.path}>
            {page.title}
          </StyledLink>
        ) : null
      })}
    </NavBarWrapper>
  )
}
