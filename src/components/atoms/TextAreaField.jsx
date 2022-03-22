import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field, ErrorMessage } from 'formik'

const Wrapper = styled.div`
  width: 100%;
  height: 220px;
  text-align: right;
`
const StyledLabel = styled.label`
  float: left;
`
const StyledTextArea = styled.textarea`
  width: 10em;
  height: 120px;
  font-size: inherit;
`
const StyledErrorMessage = styled(ErrorMessage)``

export const TextAreaField = (props) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <Field name={props.name}>
        {({ field }) => {
          return <StyledTextArea name={props.name} value={field.value} onChange={field.onChange} />
        }}
      </Field>
      <br />
      <StyledErrorMessage name={props.name} />
    </Wrapper>
  )
}

TextAreaField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
}
