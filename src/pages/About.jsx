import React from 'react'

import styled from 'styled-components'

import lang from '../defaultLang'

const AboutWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border: 2px solid rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.darkFont});
  font-size: 20px;
  white-space: normal;
  text-align: justify;
  @media (max-width: 360px) {
    font-size: 14px;
  }
`

export const About = () => {
  return (
    <AboutWrapper>
      <div>{ lang.aboutPage.line1 }</div>
      <br />
      <div>{ lang.aboutPage.line2 }</div>
      <br />
      <div>{ lang.aboutPage.line3 }</div>
      <br />
      <div>{ lang.aboutPage.line4 }</div>
    </AboutWrapper>
  )
}
