import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useHistory } from 'react-router-dom'

import 'swiper/swiper-bundle.css'

import { Image } from '../../atoms'
import { RightCaruselButtonIcon, LeftCaruselButtonIcon } from '../../../icons/icons'

const AdvertismentCaruselWrapper = styled.div`
  position: relative;
  heigth: 300px;
  width: inherit;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  @media (max-width: 360px) {
    height: 100px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    height: 188px;
  }
`

const Slide = styled.div`
  min-width: 100%;
  width: inherit;
  height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  transition: 2s;
  @media (max-width: 360px) {
    height: 100px;
  }
`

const Button = styled.button`
  z-index: 1;
  position: absolute;
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  height: 300px;
  width: 30px;
  background: none;
  outline: none;
  border: none;
  &:hover {
    background-color: rgb(${({ theme }) => theme.background});
    cursor: pointer;
  }
  svg {
    height: 30px;
    width: 30px;
  }
  @media (max-width: 360px) {
    width: 6px;
    height: 60px;
  }
`
const RightButton = styled(Button)`
  right: 0;
  @media (max-width: 360px) {
    display: none;
  }
`
const LeftButton = styled(Button)`
  left: 0;
  @media (max-width: 360px) {
    display: none;
  }
`
const DesktopViewBox = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    display: none;
  }
`
const MobileViewBox = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`

export const AdvertismentCarusel = ({ images, duration, route }) => {
  const history = useHistory()
  const imgIndexes = Object.keys(images).map((index) => +index)
  const [id, setID] = useState(0)
  const [caruseling, setCaruseling] = useState(0)
  SwiperCore.use([Autoplay])

  function moveRight() {
    if (caruseling) {
      if (id === imgIndexes.length - 1) {
        setID(0)
      } else {
        setID(id + 1)
      }
    }
  }

  function moveLeft() {
    if (id === 0) setID(imgIndexes.length - 1)
    else setID(id - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCaruseling((prev) => prev + 1)
    }, duration)
    return function () {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    moveRight()
  }, [caruseling])

  function handleClickImage() {
    history.push(route)
  }

  return (
    <AdvertismentCaruselWrapper>
      <DesktopViewBox>
        <LeftButton onClick={() => moveLeft()}>
          <LeftCaruselButtonIcon />
        </LeftButton>
        {imgIndexes.map((index) => (
          <Slide
            key={index}
            style={{ transform: `translateX(-${id * 100}%)` }}
            onClick={handleClickImage}
          >
            <Image src={images[index]} />
          </Slide>
        ))}
        <RightButton onClick={() => moveRight()}>
          <RightCaruselButtonIcon />
        </RightButton>
      </DesktopViewBox>
      <MobileViewBox>
        <Swiper loop="true" autoplay={{ delay: duration }} speed={2000}>
          {imgIndexes.map((index) => (
            <SwiperSlide key={index}>
              <Slide onClick={handleClickImage}>
                <Image src={images[index]} />
              </Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </MobileViewBox>
    </AdvertismentCaruselWrapper>
  )
}

AdvertismentCarusel.propTypes = {
  images: PropTypes.object,
  duration: PropTypes.number,
  route: PropTypes.string,
}
