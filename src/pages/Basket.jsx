import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { BasketIcon } from '../icons/icons'
import { useRequest } from '../hooks/request.hook'
import lang from '../defaultLang'
import { LoadingAnimation } from '../components/molecules'
import { getFromLocalStorage, putToLocalStorage } from '../components/atoms'
import { routes, GET_ITEMS_FROM_BASKET_URL, UPDATE_USER_BASKET_URL } from '../config'
import { setCurrentItem, refreshBasketLength, setMessage, logout } from '../redux/actions'

const BasketWrapper = styled.div`
  width: inherit;
  height: 100%;
  color: rgb(${({ theme }) => theme.darkFont});
`
const BasketFullBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 30px;
  @media (max-width: 360px) {
    display: table;
    margin: 0;
  }
`
const BasketEmptyBox = styled.div`
  width: 300px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -15px 0 0 -150px;
  text-align: center;
  font-size: 24px;
`

const CheckoutBox = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border: 4px solid rgb(${({ theme }) => theme.lightFont});
  border-radius: 10px;
  @media (max-width: 360px) {
    display: table-header-group;
    border: none;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 200px;
    border: none;
  }
`
const BasketCalculation = styled.div``

const ItemBox = styled.div`
  width: 780px;
  height: 100px;
  margin: 0 0 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  @media (max-width: 360px) {
    width: 340px;
    margin: 15px 0 15px 0;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 468px;
    margin: 15px 0 15px 0;
  }
`

const ItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`
const ItemTitle = styled.div`
  width: 240px;
  height: 100%;
  text-align: left;
  white-space: normal;
  @media (max-width: 360px) {
    width: 140px;
    font-weight: 600;
    font-size: 14px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 140px;
    font-weight: 600;
    font-size: 16px;
  }
`
const ItemPrice = styled.div`
  width: 100px;
  @media (max-width: 360px) {
    font-size: 14px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    font-size: 16px;
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
const CheckoutButton = styled(StyledButton)`
  @media (max-width: 360px) {
    font-size: 14px;
    font-weight: 500;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 150px;
    font-size: 14px;
    font-weight: 500;
  }
`
const RemoveButton = styled(StyledButton)`
  width: 100px;
  height: 60px;
  @media (max-width: 360px) {
    font-size: 14px;
    font-weight: 500;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    font-size: 14px;
    font-weight: 500;
  }
`
const StyledLink = styled(Link)`
  width: 640px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: rgb(${({ theme }) => theme.darkFont});
  @media (max-width: 360px) {
    width: 240px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 390px;
  }
`
const StyledBasketIcon = styled(BasketIcon)`
  color: inherit;
`
const TitleAndPriceBox = styled.div`
  width: 540px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 360px) {
    width: 140px;
    flex-direction: column;
    margin: 0 5px;
    text-align: justify;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 290px;
  }
`

const Basket = ({ token, isLoggedIn }) => {
  const dispatch = useDispatch()
  const { sendRequest, loading, message } = useRequest()
  const [currentBasket, setCurrentBasket] = useState([])

  useEffect(() => {
    getBasket()
  }, [])

  useEffect(() => {
    dispatch(setMessage(message))
    if (message.type === 'error') {
      dispatch(logout())
    }
  }, [message])

  function getBasket() {
    const itemsID = getFromLocalStorage('basket') || []
    sendRequest('POST', GET_ITEMS_FROM_BASKET_URL, { itemsID })
    .then((response) => {setCurrentBasket(response)}).catch(() => {console.log(currentBasket)})
  }

  function handleClickRemoveItem(item) {
    removeItemFromBasket(item)
    getBasket()
  }

  function removeItemFromBasket(item) {
    const itemsID = getFromLocalStorage('basket') || []
    const index = itemsID.findIndex((id) => id === item.id)
    const basket = itemsID.slice()
    basket.splice(index, 1)
    putToLocalStorage('basket', basket)
    dispatch(refreshBasketLength())
    if (isLoggedIn) {
      updateUserBasket()
    }
  }

  async function updateUserBasket() {
    const basket = getFromLocalStorage('basket') || []
    await sendRequest(
      'POST',
      UPDATE_USER_BASKET_URL,
      { token, basket },
      { Authorization: `Bearer ${token}` }
    )
  }

  return (
    <BasketWrapper>
      {currentBasket && currentBasket.length ? (
        <BasketFullBox>
          <div>
            {currentBasket.map((item) => (
              <ItemBox key={currentBasket.indexOf(item)}>
                <StyledLink
                  to={routes.item}
                  onClick={() => dispatch(setCurrentItem(item))}
                >
                  <ItemImg src={item.img} />
                  <TitleAndPriceBox>
                    <ItemTitle>{item.name}</ItemTitle>
                    <ItemPrice>{lang.basketPage.price + item.price + lang.basketPage.unit}</ItemPrice>
                  </TitleAndPriceBox>
                </StyledLink>
                <RemoveButton onClick={() => handleClickRemoveItem(item)}>
                  <StyledBasketIcon size="24px" />
                  <br />
                  { lang.basketPage.delete }
                </RemoveButton>
              </ItemBox>
            ))}
          </div>
          <CheckoutBox>
            <BasketCalculation>
              <h3>{ lang.basketPage.summary }</h3>
              { currentBasket
                .reduce((sum, item) => sum + Number.parseInt(item.price), 0)
                .toString() + ' ' + lang.basketPage.unit }
            </BasketCalculation>
            <CheckoutButton onClick={null}>{ lang.basketPage.makeOrder }</CheckoutButton>
          </CheckoutBox>
        </BasketFullBox>
      ) : loading ? null : (
        <BasketEmptyBox>{ lang.basketPage.empty }</BasketEmptyBox>
      )}
      <LoadingAnimation collapsed={!loading} />
    </BasketWrapper>
  )
}

Basket.propTypes = { isLoggedIn: PropTypes.bool, token: PropTypes.string }

export const ReduxConnectedBasket = connect((state) => ({
  isLoggedIn: state.user.isLoggedIn,
  token: state.user.data.token,
}))(Basket)
