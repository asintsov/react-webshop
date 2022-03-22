import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import { Image } from '../../atoms'
import {CARUSEL_SPEED} from '../../../config'
import { RightCaruselButtonIcon, LeftCaruselButtonIcon } from '../../../icons/icons'

const ActionsCaruselWrapper = styled.div`
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
  margin: 10px 0;
  @media (max-width: 768px) {
    display: none;
  }
`
const MobileViewBox = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`

export const ActionsCarusel = ({ images, duration, id }) => {
  const count = Object.keys(images).length
  const imgIndexes = []
  for (let i = 1; i <= count; i++) {
    imgIndexes.push(i)
  }
  const [swiper, setSwiper] = useState(null)
  SwiperCore.use([Autoplay])

  useEffect(() => {
    const sw = document.querySelector(`#${id}-swiper`).swiper
    setSwiper(sw)
  }, [])

  return (
    <ActionsCaruselWrapper>
      <DesktopViewBox>
        <Swiper loop="true" autoplay={{ delay: duration }} speed={CARUSEL_SPEED} id={`${id}-swiper`}>
          {imgIndexes.map((index) => (
            <SwiperSlide key={index}>
              <Slide>
                <LeftButton onClick={() => swiper.slidePrev()}>
                  <LeftCaruselButtonIcon />
                </LeftButton>
                <Image src={images[index]} />
                <RightButton onClick={() => swiper.slideNext()}>
                  <RightCaruselButtonIcon />
                </RightButton>
              </Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </DesktopViewBox>
      <MobileViewBox>
        <Swiper loop="true" autoplay={{ delay: duration }} speed={CARUSEL_SPEED}>
          {imgIndexes.map((index) => (
            <SwiperSlide key={index}>
              <Slide>
                <Image src={images[index]} />
              </Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </MobileViewBox>
    </ActionsCaruselWrapper>
  )
}

ActionsCarusel.propTypes = {
  images: PropTypes.object,
  duration: PropTypes.number,
  id: PropTypes.string,
}
