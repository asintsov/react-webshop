import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import lang from '../../../defaultLang'

const SortBoxWrapper = styled.div`
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 0 5px 5px 5px;
  border: 4px solid rgb(${({ theme }) => theme.lightFont});
  border-radius: 10px;
  @media (max-width: 360px) {
    display: none;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    display: none;
  }
`
const StyledButton = styled.button`
  width: 200px;
  height: 30px;
  margin: 0 10px;
  border: none;
  padding: 5px 5px;
  border-radius: 3px;
  background-color: rgb(${({ theme }) => theme.darkFont});
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: inherit;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background: none;
    border: 1px solid rgb(${({ theme }) => theme.darkFont});
    color: rgb(${({ theme }) => theme.darkFont});
  }
  &:focus {
    outline: none;
  }
`

export const SortBox = ({ handleClickSort }) => {
  return (
    <SortBoxWrapper>
      <h3>{lang.sortBox.sortByPrice}</h3>
      <StyledButton
        onClick={() => {
          handleClickSort(1)
        }}
      >
        {lang.sortBox.downToUp}
      </StyledButton>
      <StyledButton
        onClick={() => {
          handleClickSort(-1)
        }}
      >
        {lang.sortBox.upToDown}
      </StyledButton>
    </SortBoxWrapper>
  )
}

SortBox.propTypes = {
  handleClickSort: PropTypes.func,
}
