import { putToLocalStorageEvent } from '../../events/localStorageEvents'

export function isEmpty(obj) {
  for (let key in obj) return false
  return true
}

export function getFromLocalStorage(name) {
  return JSON.parse(window.localStorage.getItem(name))
}

export function putToLocalStorage(name, data) {
  window.localStorage.setItem(name, JSON.stringify(data))
  window.dispatchEvent(putToLocalStorageEvent)
}
