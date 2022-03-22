import React from 'react'

import { Field } from 'formik'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import lang from '../../defaultLang'

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  text-align: right;
  display: ${({ collapsed }) => (collapsed === true ? 'none' : 'inline')};
`
const StyledLabel = styled.label`
  float: left;
`
const StyledSelect = styled.select`
  direction: rtl;
  width: 187px;
  height: 30px;
  font-size: inherit;
`
const StyledOption = styled.option`
  width: 187px;
`

export const SelectField = ({ setFieldValue, collapsed, label, name, handleChange, array }) => {
  return (
    <Wrapper collapsed={collapsed}>
      <StyledLabel>{label}</StyledLabel>
      <Field name={name}>
        {({ field }) => {
          return (
            <StyledSelect
              name={field.name}
              value={field.value}
              onChange={(e) => {
                setFieldValue(field.name.toString(), e.target.value)
                if (handleChange) handleChange(e.target.value)
              }}
            >
              <StyledOption value="" disabled hidden>
                {lang.selectField.choice}
              </StyledOption>
              {array.map((element) => {
                return (
                  <StyledOption key={element} value={element}>
                    {element}
                  </StyledOption>
                )
              })}
            </StyledSelect>
          )
        }}
      </Field>
    </Wrapper>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  array: PropTypes.array,
  handleChange: PropTypes.func,
  collapsed: PropTypes.bool,
  setFieldValue: PropTypes.func,
}
