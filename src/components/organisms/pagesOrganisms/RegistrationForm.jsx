import React from 'react'

import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import lang from '../../../defaultLang'
import { routes } from '../../../config'
import { TextField, GenderField } from '../../atoms'

const RegistrationFormWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: absolute;
  top: 110px;
  left: 50%;
  margin: 40px 0 0 -250px;
  padding: 5px 5px;
  background: none;
  color: rgb(${({ theme }) => theme.darkFont});
  border: none;
  font-size: 18px;
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  @media (max-width: 360px) {
    width: 300px;
    height: 400px;
    top: 150px;
    left: 50%;
    margin: 0 0 0 -150px;
    font-size: 12px;
  }
`

const StyledForm = styled(Form)`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  @media (max-width: 360px) {
    width: 300px;
    height: 400px;
  }
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
const StyledLink = styled(Link)`
  text-decoration: none;
  width: 200px;
  max-height: 20px;
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

export const RegistrationForm = ({ handleSubmit }) => {
  return (
    <RegistrationFormWrapper>
      <Formik
        initialValues={{
          name: '',
          mail: '',
          phone: '',
          gender: lang.registrationForm.male,
          login: '',
          password: '',
          passwordRepeat: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string(),
          mail: Yup.string().email(lang.registrationForm.invalidMail),
          phone: Yup.string().matches(
            /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
            lang.registrationForm.invalidPhone
          ),
          login: Yup.string(),
          password: Yup.string(),
          passwordRepeat: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        <StyledForm>
          <TextField name="name" type="text" label={lang.registrationForm.name} />
          <GenderField name="gender" label={lang.registrationForm.gender} />
          <TextField name="mail" type="text" label={lang.registrationForm.mail} />
          <TextField name="phone" type="text" label={lang.registrationForm.phone} />
          <TextField name="login" type="text" label={lang.registrationForm.login} />
          <TextField name="password" type="text" label={lang.registrationForm.password} />
          <ButtonsPanel>
            <StyledButton type="submit">{lang.registrationForm.submit}</StyledButton>
            <StyledLink to={routes.home}>{lang.registrationForm.comeBack}</StyledLink>
          </ButtonsPanel>
        </StyledForm>
      </Formik>
    </RegistrationFormWrapper>
  )
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func,
}
