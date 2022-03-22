import React from 'react'

import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import lang from '../../defaultLang'
import { TextField } from '../atoms'
import { routes } from '../../config'

const LoginFormWrapper = styled.div`
  width: 230px;
  height: 340px;
  z-index: 1;
  position: absolute;
  top: 110px;
  right: 50%;
  margin: 0 -630px 0 0;
  padding: 0 5px;
  font-size: inherit;
  background-color: rgb(${({ theme }) => theme.header});
  color: rgb(${({ theme }) => theme.lightFont});
  visibility: ${({ collapsed }) => (collapsed === true ? 'hidden' : 'visible')};
  transition: all 0.2s ease-out;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  @media (max-width: 360px) {
    font-size: 12px;
    top: 128px;
    right: 50%;
    margin: 0 -170px 0 0;
    border-radius: 3px;
    border: 1px solid rgb(${({ theme }) => theme.lightFont});
    font-size: 14px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    font-size: 14px;
    top: 110px;
    right: 50%;
    margin: 0 -375px 0 0;
    border-radius: 3px;
    border: 1px solid rgb(${({ theme }) => theme.lightFont});
    font-size: 14px;
  }
`
const StyledForm = styled(Form)`
  width: 230px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`
const ButtonsPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: inherit;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
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
  color: rgb(${({ theme }) => theme.lightFont});
  font-size: inherit;
  font-weight: 600;
  transition-duration: 0.2s;
  &:hover {
    background-color: rgb(${({ theme }) => theme.darkFont});
  }
  &:focus {
    outline: none;
  }
`

export const LoginForm = (props) => {
  return (
    <LoginFormWrapper collapsed={props.collapsed} id="loginForm-wrapper">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={Yup.object({
          login: Yup.string()
            .max(15, lang.loginForm.loginMaxNotice)
            .required(lang.loginForm.requiredNotice),
          password: Yup.string()
            .max(20, lang.loginForm.passwordMaxNotice)
            .required(lang.loginForm.requiredNotice),
        })}
        onSubmit={(values, { setSubmitting }) => {
          props.handleSubmit(values)
          setSubmitting(false)
        }}
      >
        <StyledForm>
          <h4>{lang.loginForm.inputLogin}</h4>
          <TextField name="login" type="text" label={lang.loginForm.loginLabel} />
          <TextField name="password" type="text" label={lang.loginForm.passwordLabel} />
          <ButtonsPanel>
            <StyledButton type="submit">{lang.loginForm.in}</StyledButton>
            <StyledLink to={routes.registration} onClick={props.handleCancel}>
            {lang.loginForm.register}
            </StyledLink>
            <StyledButton type="button" onClick={props.handleCancel}>
            {lang.loginForm.cancel}
            </StyledButton>
          </ButtonsPanel>
        </StyledForm>
      </Formik>
    </LoginFormWrapper>
  )
}

LoginForm.propTypes = {
  title: PropTypes.string,
  renderIcon: PropTypes.func,
  collapsed: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
}
