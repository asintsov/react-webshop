import React from 'react'

import styled from 'styled-components'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import { pages } from './config'
import { ReduxConnectedMainMenu, NavBar } from './components/organisms'

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 1260px;
  @media (max-width: 360px) {
    width: 340px;
  }
  @media (min-width: 361px) and (max-width: 768px) {
    width: 748px;
  }

  header {
    width: inherit;
  }

  main {
    width: inherit;
    padding: 110px 0 30px 0;
  }
`

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <header>
          <ReduxConnectedMainMenu />
          <NavBar />
        </header>
        <main>
          <Switch>
            {pages.map((page) => {
              return (
                <Route key={page.id} path={page.path}>
                  {page.component}
                </Route>
              )
            })}
            <Redirect from="/" to="/home" />
          </Switch>
        </main>
      </BrowserRouter>
    </AppWrapper>
  )
}
export default App
