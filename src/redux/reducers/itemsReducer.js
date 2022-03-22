import { SET_CURRENT_ITEM, SET_SEARCH_STRING, REFRESH_BASKET_LENGTH } from '../actions/itemsActions'

function getFromLocalStorage(name) {
  return JSON.parse(window.localStorage.getItem(name))
}

const defaultState = {
  currentItem: {},
  searchString: '',
  basketLength: getFromLocalStorage('basket') ? getFromLocalStorage('basket').length : 0,
}

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM:
      return { ...state, currentItem: action.payload }
    case SET_SEARCH_STRING: {
      return { ...state, searchString: action.payload }
    }
    case REFRESH_BASKET_LENGTH: {
      return { ...state, basketLength: getFromLocalStorage('basket') ? getFromLocalStorage('basket').length : 0 }
    }
    default:
      return state
  }
}
