import React, { useState } from 'react'

import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import styled from 'styled-components'

import lang from '../../../defaultLang'
import { CATEGORIES, TYPES } from '../../../config'
import { TextField, TextAreaField, FileInput, SelectField } from '../../atoms'

const AddItemFormFormWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: absolute;
  top: 110px;
  left: 50%;
  margin: 20px 0 0 -250px;
  padding: 5px 5px;
  background: none;
  color: rgb(${({ theme }) => theme.darkFont});
  border: none;
  font-size: 18px;
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  @media (max-width: 360px) {
    font-size: 12px;
    width: 80vw;
    height: 400px;
    top: 10vh;
    left: 5vw;
    margin: 0 0;
  }
`

const StyledForm = styled(Form)`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const ButtonsPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-item: center;
  font-size: inherit;
`

const StyledButton = styled.button`
  width: 200px;
  min-height: 20px;
  margin: 0 10px;
  background: none;
  border: none;
  padding: 5px 5px;
  border-radius: 3px;
  height: 30px;
  color: rgb(${({ theme }) => theme.darkFont});
  font-size: inherit;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
    color: rgb(${({ theme }) => theme.lightFont});
  }
  &:focus {
    outline: none;
  }
`

export const AddItemForm = ({ handleSubmit }) => {
  const [collapsed, setCollapsed] = useState({
    typesFirst: true,
    typesSecond: true,
    typesThird: true,
  })

  function setInputCollapsed(input) {
    const temp = Object.assign({}, collapsed)
    for (let key in temp) {
      if (key === input) temp[key] = !temp[key]
      else temp[key] = true
    }
    setCollapsed(temp)
  }

  function handleChangeCategoriesSelect(category) {
    switch (category) {
      case CATEGORIES.FIRST:
        setInputCollapsed('typesFirst')
        break
      case CATEGORIES.SECOND:
        setInputCollapsed('typesSecond')
        break
      case CATEGORIES.THIRD:
        setInputCollapsed('typesThird')
        break
    }
  }

  return (
    <AddItemFormFormWrapper>
      <Formik
        initialValues={{
          name: '',
          category: '',
          type: '',
          characteristics: '',
          specification: '',
          price: '',
          quantity: '',
          img: {},
        }}
        validationSchema={Yup.object({
          name: Yup.string(),
          characteristics: Yup.string(),
          specification: Yup.string(),
          price: Yup.string(),
          quantity: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({ setFieldValue }) => (
          <StyledForm>
            <TextField name="name" type="text" label={lang.addItemForm.name} />
            <SelectField
              name="category"
              label={lang.addItemForm.category}
              array={Object.values(CATEGORIES)}
              handleChange={handleChangeCategoriesSelect}
              setFieldValue={setFieldValue}
            />
            <SelectField
              name="type"
              label={TYPES.FIRST.name}
              array={TYPES.FIRST.arr}
              collapsed={collapsed.typesFirst}
              setFieldValue={setFieldValue}
            />
            <SelectField
              name="type"
              label={TYPES.SECOND.name}
              array={TYPES.SECOND.arr}
              collapsed={collapsed.typesSecond}
              setFieldValue={setFieldValue}
            />
            <SelectField
              name="type"
              label={TYPES.THIRD.name}
              array={TYPES.THIRD.arr}
              collapsed={collapsed.typesThird}
              setFieldValue={setFieldValue}
            />
            <TextAreaField name="characteristics" label={lang.addItemForm.characteristics} />
            <TextAreaField name="specification" label={lang.addItemForm.specification} />
            <TextField name="price" type="text" label={lang.addItemForm.price} />
            <TextField name="quantity" type="text" label={lang.addItemForm.quantity} />
            <FileInput name="img" type="file" label={lang.addItemForm.image} setFieldValue={setFieldValue} />
            <ButtonsPanel>
              <StyledButton type="submit">{lang.addItemForm.submit}</StyledButton>
            </ButtonsPanel>
          </StyledForm>
        )}
      </Formik>
    </AddItemFormFormWrapper>
  )
}

AddItemForm.propTypes = {
  handleSubmit: PropTypes.func,
}
