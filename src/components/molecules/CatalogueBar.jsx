import React, { useState } from 'react'

import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import lang from '../../defaultLang'
import { putToLocalStorage } from '../atoms'
import { CatalogueIcon } from '../../icons/icons'
import { CATEGORIES, TYPES, routes } from '../../config'

const CatalogueBarWrapper = styled.div`
  width: 154px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  font-size: 12px;
  border: ${({ collapsed, theme }) =>
    collapsed === true ? `1px solid rgb(${theme.header})` : `1px solid rgb(${theme.lightFont})`};
  @media (max-width: 360px) {
    height: 55px;
    width: 55px;
    border: none;
  }
`
const StyledButton = styled.button`
  position: relative;
  top: 5px;
  width: 150px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background: none;
  border: none;
  padding: 5px 5px;
  border-radius: 3px;
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
  svg {
    width: 24px;
    height: 24px;
  }
  @media (max-width: 360px) {
    position: static;
    top: 0;
    height: 55px;
    width: 55px;
    flex-direction: column;
    padding: 3px 3px;
    font-weight: 500;

    svg {
      width: 34px;
      height: 34px;
    }
  }
`
const CategoriesBar = styled.div`
  width: 150px;
  min-height: 100px;
  position: relative;
  top: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 2px;
  border-radius: 3px;
  border: 1px solid rgb(${({ theme }) => theme.lightFont});

  background-color: rgb(${({ theme }) => theme.header});
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  transition: all 0.2s ease-out;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  @media (max-width: 360px) {
    width: 130px;
    min-height: 110px;
    top: 1px;
    left: 31px;
    font-size: 14px;
  }
`
const TypesBar = styled.div`
  width: 150px;
  min-height: 100px;
  position: relative;
  top: -90px;
  left: 156px;
  right: 150px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 2px;
  border-radius: 3px;
  border: 1px solid rgb(${({ theme }) => theme.lightFont});

  background-color: rgb(${({ theme }) => theme.header});
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  transition: all 0.2s ease-out;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  @media (max-width: 360px) {
    width: 130px;
    min-height: 110px;
    top: -115px;
    left: 161px;
    font-size: 14px;
  }
`

export const CatalogueBar = () => {
  const [collapsed, setCollapsed] = useState({ categories: true, types: true })
  const [typesArr, setTypesArr] = useState([])
  const history = useHistory()

  function handleMouseEnterCategory(category) {
    switch (category) {
      case CATEGORIES.FIRST:
        setTypesArr(TYPES.FIRST.arr)
        break
      case CATEGORIES.SECOND:
        setTypesArr(TYPES.SECOND.arr)
        break
      case CATEGORIES.THIRD:
        setTypesArr(TYPES.THIRD.arr)
        break
    }
    if (!collapsed.categories && collapsed.types)
      setCollapsed({ ...collapsed, types: !collapsed.types })
  }

  function handleClickCategory(category) {
    putToLocalStorage('itemCategory', category)
    putToLocalStorage('itemType', '')
    history.push(routes.catalogue)
    setCollapsed({ categories: true, types: true })
  }

  function handleClickType(type) {
    putToLocalStorage('itemType', type)
    history.push(routes.catalogue)
    setCollapsed({ categories: true, types: true })
  }

  function handleClickCatalogue() {
    setCollapsed({
      categories: !collapsed.categories,
      types: true,
    })
  }

  return (
    <CatalogueBarWrapper collapsed={collapsed.categories}>
      <StyledButton onClick={handleClickCatalogue}>
        <CatalogueIcon />{lang.catalogue.title}
      </StyledButton>
      <CategoriesBar collapsed={collapsed.categories}>
        {Object.values(CATEGORIES).map((category) => (
          <StyledButton
            key={category}
            onMouseEnter={() => handleMouseEnterCategory(category)}
            onClick={() => handleClickCategory(category)}
            onTouchStart={() => handleMouseEnterCategory(category)}
          >
            {category}
          </StyledButton>
        ))}
      </CategoriesBar>
      <TypesBar collapsed={collapsed.types}>
        {typesArr.map((type) => (
          <StyledButton key={type} onClick={() => handleClickType(type)}>
            {type}
          </StyledButton>
        ))}
      </TypesBar>
    </CatalogueBarWrapper>
  )
}
