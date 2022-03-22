import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  text-align: right;
`
const StyledLabel = styled.label`
  float: left;
`
const StyledInput = styled.input`
  width: 190px;
`

export const FileInput = ({ label, ...props }) => {
  const [src, setSRC] = useState()
  function fileToSrc(file) {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        setSRC(() => e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    props.setFieldValue('img', src)
  }, [src])
  return (
    <Wrapper>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput
        {...props}
        onChange={(event) => {
          fileToSrc(event.currentTarget.files[0])
        }}
      />
    </Wrapper>
  )
}

FileInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  setFieldValue: PropTypes.func,
}
