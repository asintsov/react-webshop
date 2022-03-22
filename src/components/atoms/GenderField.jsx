import React from 'react'

import { Field } from 'formik'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import lang from '../../defaultLang'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  text-align: right;
`
const StyledLabel = styled.label`
  float: left;
`
const StyledInnerLabel = styled.label`
  padding-left: 70px;
  font-size: inherit;
`

export const GenderField = (props) => {
  return (
    <Wrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInnerLabel htmlFor="radio-male">{lang.genderField.maleLabel}</StyledInnerLabel>
      <Field id="radio-male" name={props.name} type="radio" value={lang.genderField.male}></Field>
      <StyledInnerLabel htmlFor="radio-female">{lang.genderField.femaleLabele}</StyledInnerLabel>
      <Field id="radio-female" name={props.name} type="radio" value={lang.genderField.female}></Field>
    </Wrapper>
  )
}

GenderField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  innerLabels: PropTypes.object,
}
