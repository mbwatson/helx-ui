import React from 'react'
import { Layout } from './components/layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { Router } from '@reach/router'
import { AuthProvider, EnvironmentProvider } from './contexts'
import {
  Home,
  AppStore,
  Account,
  Branding,
  NotFound
} from './views'

const App = () => {
  return (
    <EnvironmentProvider>
      <AuthProvider>
        <ThemeProvider theme={ theme }>
          <Layout>
            <Router>
              <Home path="/" />
              <AppStore path="app-store" />
              <Account path="account" />
              <Branding path="branding" />
              <NotFound default />
            </Router>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </EnvironmentProvider>
  );
}

export default App
