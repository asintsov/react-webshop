import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import lang from '../../../defaultLang'
import { LoadingAnimation } from '../../molecules'
import { setCurrentItem } from '../../../redux/actions'
import { useRequest } from '../../../hooks/request.hook'
import {
  routes,
  GET_ITEMS_WITH_PAGINATION_URL,
  DESKTOP_PAGE_LIMIT,
  MOBILE_PAGE_LIMIT,
  TAB_PAGE_LIMIT,
} from '../../../config'

const ItemsEndlessScrollWrapper = styled.div`
  width: 1200px;
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 360px) {
    width: 320px;
    margin: 10px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 708px;
  }
`

const ItemWrapper = styled.div`
  margin: 20px;
  transition: all 0.2s ease-out;
  :hover {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
  }
  @media (max-width: 360px) {
    margin: 10px;
    width: 140px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    margin: 15px;
  }
`
const StyledImg = styled.img`
  width: 200px;
  @media (max-width: 360px) {
    width: 100px;
  }
`
const Description = styled.div`
  width: 200px;
  white-space: normal;
  text-align: left;
  color: rgb(${({ theme }) => theme.darkFont});
  @media (max-width: 360px) {
    width: 100px;
    font-size: 12px;
  }
`

const Price = styled.div`
  width: 200px;
  white-space: normal;
  font-size: 20px;
  font-weight: 600;
  color: rgb(${({ theme }) => theme.darkFont});
  @media (max-width: 360px) {
    width: 100px;
    font-size: 14px;
    font-weight: 500;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    font-size: 18px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ItemsEndlessScroll = ({ type, category }) => {
  const [items, setItems] = useState([])
  const [fetching, setFetching] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(1)
  const defaultPageLimit =
    screen.width === 360
      ? type || category
        ? MOBILE_PAGE_LIMIT + 2
        : MOBILE_PAGE_LIMIT
      : screen.width === 768
      ? type || category
        ? TAB_PAGE_LIMIT + 3
        : TAB_PAGE_LIMIT
      : type || category
      ? DESKTOP_PAGE_LIMIT + 5
      : DESKTOP_PAGE_LIMIT
  const [pageLimit, setPageLimit] = useState(defaultPageLimit)

  const { sendRequest, loading } = useRequest()
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return function () {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setItems([])
    setTotalCount(1)
    setPage(0)
    setPageLimit(15)
    setFetching(true)
  }, [category, type])

  useEffect(async () => {
    if (screen.width === 768) setPageLimit(TAB_PAGE_LIMIT)
    else if (screen.width === 360) setPageLimit(MOBILE_PAGE_LIMIT)

    const queryStr = `?_limit=${pageLimit}&_page=${page}&_category=${category}&_type=${type}`
    if (fetching && items.length < totalCount) {
      const response = await sendRequest(
        'GET',
        GET_ITEMS_WITH_PAGINATION_URL + queryStr,
        null,
        {},
        stopFetching
      )
      setTotalCount(response.totalCount)
      setPage((prev) => prev + 1)
      setItems([...items, ...response.items])
    }
  }, [fetching])

  function handleScroll(event) {
    // event.target.documentElement.scrollHeight - общая высота страницы с учетом скролла
    // event.target.documentElement.scrollTop - текущее положение скролла от верха страницы
    // window.innerHeight - высота видимой области страницы
    let scrollHeight = event.target.documentElement.scrollHeight
    let scrollTop = event.target.documentElement.scrollTop
    let windowHeight = window.innerHeight

    if (scrollHeight - (scrollTop + windowHeight) < 50) {
      setFetching(true)
    }
  }

  function stopFetching() {
    setFetching(false)
  }

  return (
    <ItemsEndlessScrollWrapper>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.id}>
            <StyledLink to={routes.item} onClick={() => dispatch(setCurrentItem(item))}>
              <StyledImg src={item.img} />
              <Price>{lang.endless.price + item.price + lang.endless.unit}</Price>
              <Description>{item.name}</Description>
            </StyledLink>
          </ItemWrapper>
        )
      })}
      <LoadingAnimation collapsed={!loading} />
    </ItemsEndlessScrollWrapper>
  )
}

ItemsEndlessScroll.propTypes = { type: PropTypes.string, category: PropTypes.string }
