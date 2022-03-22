import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import lang from '../../../defaultLang'

const FilterBoxWrapper = styled.div`
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
const RangeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const AcceptButton = styled.button`
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

export const FilterBox = ({ minPrice, maxPrice, handleClick }) => {
  const [filterMinPrice, setFilterMinPrice] = useState(minPrice)
  const [filterMaxPrice, setFilterMaxPrice] = useState(maxPrice)

  useEffect(() => setFilterMinPrice(minPrice), [minPrice])
  useEffect(() => setFilterMaxPrice(maxPrice), [maxPrice])
  return (
    <FilterBoxWrapper>
      <h3>{lang.filterBox.filter}</h3>
      <RangeWrapper>
        <div>{lang.filterBox.minPrice}</div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="10"
          value={filterMinPrice}
          onChange={(e) => {
            setFilterMinPrice(e.target.value)
          }}
        />
        <div>{(filterMinPrice || minPrice) + '' + lang.filterBox.unit} </div>
      </RangeWrapper>
      <RangeWrapper>
        <div>{lang.filterBox.maxPrice}</div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="10"
          value={filterMaxPrice}
          onChange={(e) => {
            setFilterMaxPrice(e.target.value)
          }}
        />
        <div>{(filterMaxPrice || maxPrice) + '' + lang.filterBox.unit}</div>
      </RangeWrapper>

      <AcceptButton onClick={() => handleClick(filterMinPrice, filterMaxPrice)}>
        Применить
      </AcceptButton>
    </FilterBoxWrapper>
  )
}

FilterBox.propTypes = {
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  handleClick: PropTypes.func,
}
