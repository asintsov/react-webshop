import React from 'react'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import lang from '../../defaultLang'
import { routes } from '../../config'
import { SnowfallIcon } from '../../icons/icons'

const LogoWrapper = styled.div`
  margin: 0 10px;
`
const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: rgb(${({ theme }) => theme.lightFont});
  svg {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 360px) {
    svg {
      width: 44px;
      height: 44px;
    }
  }
`
const LogoTitle = styled.div`
  @media (max-width: 360px) {
    display: none;
  }
`
const LogoIcon = styled(SnowfallIcon)``

export const Logo = () => (
  <LogoWrapper>
    <StyledLink to={routes.home}>
      <LogoIcon />
      <LogoTitle>{lang.logo.title}</LogoTitle>
    </StyledLink>
  </LogoWrapper>
)
