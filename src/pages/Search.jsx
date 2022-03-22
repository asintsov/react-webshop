import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import lang from '../defaultLang'
import { BasketIcon } from '../icons/icons'
import { useRequest } from '../hooks/request.hook'
import { FilterBox, SortBox } from '../components/organisms'
import { LoadingAnimation } from '../components/molecules'
import { putToLocalStorage, getFromLocalStorage } from '../components/atoms'
import { routes, FIND_ITEM_URL, UPDATE_USER_BASKET_URL } from '../config'
import { setCurrentItem, refreshBasketLength, setMessage, logout } from '../redux/actions'

const SearchWrapper = styled.div`
  width: inherit;
  height: 100%;
  color: rgb(${({ theme }) => theme.darkFont});
`
const SearchFullBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 30px;
  @media(max-width: 360px){
    margin: 10px 0;
  })
`
const SearchEmptyBox = styled.div`
  width: 300px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -15px 0 0 -150px;
  text-align: center;
  font-size: 24px;
`

const ItemBox = styled.div`
  width: 780px;
  height: 100px;
  margin: 0 0 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: rgb(${({ theme }) => theme.darkFont});
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
const AddToBasketButton = styled(StyledButton)`
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
const CountBox = styled.div`
  height: 30px;
  margin: 0 0 30px 0;
  text-align: left;
  font-size: 20px;
  color: rgb(${({ theme }) => theme.darkFont});
  @media (max-width: 360px) {
    margin: 0;
    font-size: 16px;
  }
`
const UploadMoreBox = styled.div`
  width: 780px;
  height: 50px;
  text-align: center;
  @media (max-width: 360px) {
    width: 340px;
    font-size: 14px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 748px;
    font-size: 14px;
  }
`

const UploadMoreButton = styled(StyledButton)`
  font-weight: 500;
  border: 1px solid rgb(${({ theme }) => theme.darkFont});
  background: none;
  color: rgb(${({ theme }) => theme.darkFont});
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
    color: rgb(${({ theme }) => theme.lightFont});
  }
  &:focus {
    outline: none;
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

const PAGE_LIMIT = 3

const Search = ({ searchString, isLoggedIn, token }) => {
  const dispatch = useDispatch()
  const { sendRequest, loading, message } = useRequest()
  const [page, setPage] = useState(1)
  const [searchList, setSearchList] = useState([])
  const [totalCount, setTotalCount] = useState(1)
  const [searching, setSearching] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [filterMinPrice, setFilterMinPrice] = useState('')
  const [filterMaxPrice, setFilterMaxPrice] = useState('')
  const [sortDirection, setSortDirection] = useState(1)

  useEffect(() => {
    dispatch(setMessage(message))
    if (message.type === 'error') {
      dispatch(logout())
    }
  }, [message])

  useEffect(() => {
    search()
  }, [searching])

  useEffect(() => {
    setSearching(true)
  }, [page])

  useEffect(() => {
    clearSearch()
    setSearching(true)
  }, [searchString])

  useEffect(() => {
    setSearchList([])
    setTotalCount(1)
    setPage(1)
    setSearching(true)
  }, [sortDirection])

  async function search() {
    const queryStr = `?_limit=${PAGE_LIMIT}&_page=${page}&_searchString=${searchString}&_filterMinPrice=${filterMinPrice}&_filterMaxPrice=${filterMaxPrice}&_sortDirection=${sortDirection}`
    if (searching && searchList.length < totalCount) {
      const res = await sendRequest('GET', FIND_ITEM_URL + queryStr, null, {}, stopSearching)
      setTotalCount(res.count)
      setSearchList([...searchList, ...res.list])
      setMinPrice(res.minPrice)
      setMaxPrice(res.maxPrice)
    }
  }

  function clearSearch() {
    setSearchList([])
    setTotalCount(1)
    setPage(1)
    setFilterMinPrice('')
    setFilterMaxPrice('')
  }

  function stopSearching() {
    setSearching(false)
  }

  function handleClickAddToBasket(item) {
    addItemToBasket(item)
  }

  function handleClickFilter(minPrice, maxPrice) {
    setFilterMinPrice(minPrice)
    setFilterMaxPrice(maxPrice)
    setSearchList([])
    if (page === 1) {
      setSearching(true)
    } else {
      setPage(1)
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

  function addItemToBasket(item) {
    const basket = getFromLocalStorage('basket') || []
    basket.push(item.id)
    putToLocalStorage('basket', basket)
    dispatch(refreshBasketLength())
    if (isLoggedIn) {
      updateUserBasket()
    }
  }

  function handleClickSort(direction) {
    setSortDirection(direction)
  }

  return (
    <SearchWrapper>
      {searchList.length ? (
        <SearchFullBox>
          <div>
            <CountBox>
              {lang.searchPage.found(searchString,totalCount,filterMinPrice,minPrice,filterMaxPrice,maxPrice)}
            </CountBox>
            {searchList.map((item) => (
              <ItemBox key={searchList.indexOf(item)}>
                <StyledLink to={routes.item} onClick={() => dispatch(setCurrentItem(item))}>
                  <ItemImg src={item.img} />
                  <TitleAndPriceBox>
                    <ItemTitle>{item.name}</ItemTitle>
                    <ItemPrice>{lang.searchPage.price + item.price + lang.searchPage.unit}</ItemPrice>
                  </TitleAndPriceBox>
                </StyledLink>
                <AddToBasketButton onClick={() => handleClickAddToBasket(item)}>
                  <StyledBasketIcon size="24px" />
                  <br />
                  {lang.searchPage.add}
                </AddToBasketButton>
              </ItemBox>
            ))}
            {searchList.length < totalCount ? (
              <UploadMoreBox>
                <UploadMoreButton
                  onClick={() => {
                    setPage((prev) => prev + 1)
                  }}
                >
                  {lang.searchPage.showMore + PAGE_LIMIT}
                </UploadMoreButton>
              </UploadMoreBox>
            ) : null}
          </div>
          <div>
            <FilterBox
              minPrice={minPrice.toString()}
              maxPrice={maxPrice.toString()}
              handleClick={handleClickFilter}
            />
            <SortBox handleClickSort={handleClickSort} />
          </div>
        </SearchFullBox>
      ) : loading ? null : (
        <SearchEmptyBox>{lang.searchPage.nothingFound(searchString)}</SearchEmptyBox>
      )}
      <LoadingAnimation collapsed={!loading} />
    </SearchWrapper>
  )
}

Search.propTypes = {
  searchString: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
}

export const ReduxConnectedSearch = connect((state) => ({
  searchString: state.items.searchString,
  isLoggedIn: state.user.isLoggedIn,
  token: state.user.data.token,
}))(Search)
