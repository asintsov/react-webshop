import React from 'react'

import lang from '../defaultLang'
import { routes }  from './routes'
import {
  Home,
  Contacts,
  About,
  Registration,
  Actions,
  ReduxConnectedItem,
  ReduxConnectedBasket,
  AddItem,
  ReduxConnectedSearch,
  Catalogue,
} from '../pages'

let page = (id, component, onNavBar=false) => ({
  id,
  title: lang.pageTitles[id],
  path: routes[id],
  component,
  onNavBar,
})

export const pages = [
  page('home', <Home />),
  page('actions', <Actions />, true),
  page('contacts', <Contacts />, true),
  page('about', <About />, true),
  page('registration', <Registration />),
  page('item', <ReduxConnectedItem />),
  page('basket', <ReduxConnectedBasket />),
  page('addItem', <AddItem />),
  page('search', <ReduxConnectedSearch />),
  page('catalogue', <Catalogue />),
]
