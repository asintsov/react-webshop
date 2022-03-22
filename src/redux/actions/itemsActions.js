export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING'
export const REFRESH_BASKET_LENGTH = 'REFRESH_BASKET_LENGTH'

export const setCurrentItem = (item) => {
  return { type: SET_CURRENT_ITEM, payload: item }
}

export const setSearchString = (searchString) => {
  return { type: SET_SEARCH_STRING, payload: searchString }
}

export const refreshBasketLength = () => {
  return { type: REFRESH_BASKET_LENGTH }
}
