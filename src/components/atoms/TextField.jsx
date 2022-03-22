import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field, ErrorMessage } from 'formik'

const TextFieldWrapper = styled.div`
  width: 100%;
  height: 80px;
  text-align: right;
`
const StyledLabel = styled.label`
  float: left;
`
const StyledField = styled(Field)`
  width: 10em;
  font-size: inherit;
`
const StyledErrorMessage = styled(ErrorMessage)``

export const TextField = (props) => {
  return (
    <TextFieldWrapper>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledField name={props.name} type={props.type} autoComplete="off"></StyledField>
      <br />
      <StyledErrorMessage name={props.name} />
    </TextFieldWrapper>
  )
}

TextField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
}
