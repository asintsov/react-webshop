import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: inherit;
  height: 300px;
  margin: 0 auto;
  @media (max-width: 360px) {
    width: 340px;
    height: 85px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 748px;
    height: 188px;
  }
`

export const Image = ({ src }) => <StyledImage src={src} alt="slide img" />

Image.propTypes = { src: PropTypes.string }
