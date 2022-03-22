import React from 'react'

import lang from '../../defaultLang'
import { Button } from './Button'
import { LogoutIcon } from '../../icons/icons'

export const LogoutButton = (props) => {
  return <Button {...props} icon={<LogoutIcon />} title={lang.logoutButton.title} />
}
