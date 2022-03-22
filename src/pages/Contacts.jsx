import React from 'react'

import styled from 'styled-components'

import lang from '../defaultLang'

const ContactsWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border: 2px solid rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.darkFont});
  font-size: 20px;
  @media (max-width: 360px) {
    font-size: 14px;
  }
`

export const Contacts = () => {
  return (
    <ContactsWrapper>
      <div>{ lang.contactsPage.addressLabel }</div>
      <div>{ lang.contactsPage.address }</div>
      <br />
      <div>{ lang.contactsPage.phonesTitle }</div>
      <div>{ lang.contactsPage.phone1 }</div>
      <div>{ lang.contactsPage.phone2 }</div>
      <div>{ lang.contactsPage.phone3 }</div>
    </ContactsWrapper>
  )
}
