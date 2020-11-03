import React from 'react'
import { Layout } from './components/layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { Router } from '@reach/router'
import { AuthProvider } from './contexts'
import {
  Home,
  AppStore,
  Account,
  NotFound
} from './views'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={ theme }>
        <Layout>
          <Router>
            <Home path="/" />
            <AppStore path="app-store" />
            <Account path="account" />
            <NotFound default />
          </Router>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
