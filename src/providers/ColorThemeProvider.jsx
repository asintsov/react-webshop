import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { summerTheme, winterTheme } from '../config'

const ColorThemeProvider = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme === 'dark' ? summerTheme : winterTheme}>{children}</ThemeProvider>
  )
}

ColorThemeProvider.propTypes = { children: PropTypes.array, theme: PropTypes.string }

export const ReduxConnectedColorThemeProvider = connect((state) => ({
  theme: state.settings.theme,
}))(ColorThemeProvider)
