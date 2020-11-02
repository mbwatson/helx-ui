import React from 'react'
import { Layout } from './components/layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { Router } from '@reach/router'
import {
  Home,
  AppStore,
  NotFound
} from './views'

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Layout>
        <Router>
          <Home path="/" />
          <AppStore path="app-store" />
          <NotFound default />
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App
