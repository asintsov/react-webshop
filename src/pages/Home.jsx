import React from 'react'

import styled from 'styled-components'

import {
  ADVERTISMENT_IMAGES,
  ACTIONS_1_IMAGES,
  ACTIONS_2_IMAGES,
  ACTIONS_3_IMAGES,
  routes,
  CARUSEL_DURATION,
} from '../config'
import { AdvertismentCarusel, ItemsEndlessScroll } from '../components/organisms'

const HomeWrapper = styled.div`
  width: inherit;
`

export const Home = () => {
  const images = Object.assign({}, [
    ...Object.values(ACTIONS_1_IMAGES),
    ...Object.values(ADVERTISMENT_IMAGES).splice(0, 2),
    ...Object.values(ACTIONS_2_IMAGES),
    ...Object.values(ADVERTISMENT_IMAGES).splice(2, 2),
    ...Object.values(ACTIONS_3_IMAGES),
  ])

  return (
    <HomeWrapper>
      <AdvertismentCarusel images={images} duration={CARUSEL_DURATION} route={routes.actions} />
      <ItemsEndlessScroll type="" category="" />
    </HomeWrapper>
  )
}
