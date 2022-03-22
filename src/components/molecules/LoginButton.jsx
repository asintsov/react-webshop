import React from 'react'

import lang from '../../defaultLang'
import { Button } from './Button'
import { LoginIcon } from '../../icons/icons'

export const LoginButton = (props) => {
  return <Button {...props} icon={<LoginIcon />} title={lang.loginButton.title} />
}
