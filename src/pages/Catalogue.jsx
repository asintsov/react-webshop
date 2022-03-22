import React, { useState, useEffect } from 'react'

import { getFromLocalStorage } from '../components/atoms'
import { ItemsEndlessScroll } from '../components/organisms'

export const Catalogue = () => {
  const [category, setCategory] = useState(getFromLocalStorage('itemCategory') || '')
  const [type, setType] = useState(getFromLocalStorage('itemType') || '')

  function handleChangeCategoryType() {
    setCategory(getFromLocalStorage('itemCategory') || '')
    setType(getFromLocalStorage('itemType') || '')
  }

  useEffect(() => {
    window.addEventListener('putToLocalStorageEvent', handleChangeCategoryType)
    return () => window.removeEventListener('putToLocalStorageEvent', handleChangeCategoryType)
  }, [])
  return (
    <div>
      <ItemsEndlessScroll type={type} category={category} />
    </div>
  )
}
