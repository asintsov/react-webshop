import { CHANGE_THEME } from '../actions/settingsActions'

const defaultState = { theme: window.localStorage.getItem('colorTheme') }

export const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      let newTheme = state.theme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('colorTheme', newTheme)
      return { ...state, theme: newTheme }
    }
    default:
      return state
  }
}
