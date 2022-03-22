import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SearchIcon } from '../../icons/icons'

const SearchInputWrapper = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const StyledInput = styled.input`
  width: 150px;
  height: 20px;
  margin: 5px 0;
  outline: none;
`
const StyledButton = styled.button`
  height: 24px;
  width: 24px;
  padding: 3px 3px;
  border-radius: 3px;
  border: none;
  background: none;
  transition-duration: 0.2s;
  fill: rgb(${({ theme }) => theme.lightFont});
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
    fill: rgb(${({ theme }) => theme.lightFont});
  }
  &:focus {
    outline: none;
  }
  searchicon: {
    fill: inherit;
  }
`

export const SearchInput = (props) => {
  return (
    <SearchInputWrapper>
      <form onSubmit={props.handleSubmit}>
        <StyledInput type="text" value={props.value} onChange={props.handleChange} />
      </form>
      <StyledButton type="button">
        <SearchIcon size="20px" onClick={props.handleSubmit} />
      </StyledButton>
    </SearchInputWrapper>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
}
