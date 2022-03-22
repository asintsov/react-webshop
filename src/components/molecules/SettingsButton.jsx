import React from 'react'

import lang from '../../defaultLang'
import { Button } from './Button'
import { SettingsIcon } from '../../icons/icons'

export const SettingsButton = (props) => {
  return <Button {...props} icon={<SettingsIcon />} title={lang.settingsButton.title} />
}
