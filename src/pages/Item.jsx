import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'

import lang from '../defaultLang'
import { UPDATE_USER_BASKET_URL } from '../config'
import { useRequest } from '../hooks/request.hook'
import { LoadingAnimation } from '../components/molecules'
import { refreshBasketLength, setMessage, logout } from '../redux/actions'
import { putToLocalStorage, getFromLocalStorage, isEmpty } from '../components/atoms'

const ItemWrapper = styled.div`
  width: inherit;
  height: 100%;
  color: rgb(${({ theme }) => theme.darkFont});
`
const Row = styled.div`
  margin: 0 0 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 360px) {
    margin: 5px 0 5px 0;
  }
`
const StyledImg = styled.img`
  width: 360px;
  border: 1px solid rgb(${({ theme }) => theme.darkFont});
  border-radius: 20px;
  @media (max-width: 360px) {
    width: 170px;
    height: 170px;
    border-radius: 3px;
  }
`
const PriceBox = styled.div`
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid rgb(${({ theme }) => theme.darkFont});
  border-radius: 5px;
  @media (max-width: 360px) {
    width: 170px;
    height: 170px;
    border: none;
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
  @media (max-width: 360px) {
    width: 150px;
    border: none;
    font-weight: 500;
    font-size: 14px;
  }
`
const Price = styled.div`
  width: 200px;
  margin: 0 10px;
  text-align: left;
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 360px) {
    width: 150px;
    font-weight: 500;
    font-size: 20px;
  }
`
const QuantityInBasket = styled.div`
  width: 200px;
  margin: 0 10px;
  text-align: left;
  font-size: 22px;
  @media (max-width: 360px) {
    width: 150px;
    font-weight: 500;
    font-size: 20px;
  }
`

const CharacteristicsBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CharacteristicsTitle = styled.div`
  margin: 0 0 10px 0;
  font-size: 20px;
`
const CharacteristicsBody = styled.div`
  text-align: justify;
  white-space: pre-wrap;
`
const SpecificationBox = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SpecificationTitle = styled.div`
  font-size: 20px;
  margin: 0 0 10px 0;
`
const SpecificationBody = styled.div`
  text-align: justify;
  white-space: normal;
`
const ItemTitle = styled.div`
  margin: 0 0 10px 0;
  font-size: 24px;
`
const DesktopViewBox = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 360px) {
    display: none;
  }
`
const MobileViewBox = styled.div`
  @media (min-width: 361px) {
    display: none;
  }
`

const Item = ({ currentItem, isLoggedIn, token }) => {
  const { sendRequest, loading, message } = useRequest()
  const dispatch = useDispatch()

  const [item, setItem] = useState({})
  const [basketCount, setBasketCount] = useState(3)

  useEffect(() => {
    if (!isEmpty(currentItem)) {
      window.localStorage.setItem('currentItem', JSON.stringify(currentItem))
    }
    setItem(Object.assign({}, getFromLocalStorage('currentItem')))
    setBasketCount(getFromLocalStorage('basket') ? getFromLocalStorage('basket').filter((x) => x === currentItem.id).length : 0)
  }, [])

  useEffect(() => {
    dispatch(setMessage(message))
    if (message.type === 'error') {
      dispatch(logout())
    }
  }, [message])

  async function updateUserBasket() {
    const basket = getFromLocalStorage('basket') || []
    await sendRequest(
      'POST',
      UPDATE_USER_BASKET_URL,
      { token, basket },
      { Authorization: `Bearer ${token}` }
    )
  }

  function addItemToBasket(item) {
    const basket = getFromLocalStorage('basket') || []
    basket.push(item.id)
    putToLocalStorage('basket', basket)
    dispatch(refreshBasketLength())
    if (isLoggedIn) {
      updateUserBasket()
    }
  }

  function handleClickAddToBasket() {
    addItemToBasket(item)
    setBasketCount((prev) => prev + 1)
  }

  return (
    <ItemWrapper>
      <DesktopViewBox>
        <Row>
          <ItemTitle>{item.name}</ItemTitle>
        </Row>
        <Row>
          <StyledImg src={item.img} />
          <CharacteristicsBox>
            <CharacteristicsTitle>{lang.itemPage.characteristics}</CharacteristicsTitle>
            <CharacteristicsBody>{item.characteristics}</CharacteristicsBody>
          </CharacteristicsBox>
          <PriceBox>
            <Price>{lang.itemPage.price + item.price + lang.itemPage.unit1}</Price>
            <QuantityInBasket>{lang.itemPage.intoBasket + basketCount + lang.itemPage.unit2}</QuantityInBasket>
            <StyledButton onClick={handleClickAddToBasket}>Добавить в корзину</StyledButton>
          </PriceBox>
        </Row>
        <Row>
          <SpecificationBox>
            <SpecificationTitle>{lang.itemPage.description}</SpecificationTitle>
            <SpecificationBody>{item.specification}</SpecificationBody>
          </SpecificationBox>
        </Row>
      </DesktopViewBox>
      <MobileViewBox>
        <Row>
          <ItemTitle>{item.name}</ItemTitle>
        </Row>
        <Row>
          <StyledImg src={item.img} />
          <PriceBox>
            <Price>{lang.itemPage.price + item.price + lang.itemPage.unit1}</Price>
            <QuantityInBasket>{lang.itemPage.intoBasket + basketCount + lang.itemPage.unit2}</QuantityInBasket>
            <StyledButton onClick={handleClickAddToBasket}>{lang.itemPage.add}</StyledButton>
          </PriceBox>
        </Row>
        <Row>
          <CharacteristicsBox>
            <CharacteristicsTitle>{lang.itemPage.characteristics}</CharacteristicsTitle>
            <CharacteristicsBody>{item.characteristics}</CharacteristicsBody>
          </CharacteristicsBox>
        </Row>
        <Row>
          <SpecificationBox>
            <SpecificationTitle>{lang.itemPage.description}</SpecificationTitle>
            <SpecificationBody>{item.specification}</SpecificationBody>
          </SpecificationBox>
        </Row>
      </MobileViewBox>
      <LoadingAnimation collapsed={!loading} />
    </ItemWrapper>
  )
}

Item.propTypes = {
  currentItem: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
}

export const ReduxConnectedItem = connect((state) => ({
  currentItem: state.items.currentItem,
  isLoggedIn: state.user.isLoggedIn,
  token: state.user.data.token,
}))(Item)
