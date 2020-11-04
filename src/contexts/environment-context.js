import React, { createContext, useContext } from 'react'

export const EnvironmentContext = createContext({ })

export const EnvironmentProvider = ({ children }) => {
  return (
    <EnvironmentContext.Provider value={{
      testVariable: process.env.REACT_APP_TEST_ENV_VAR,
      helxSearchUrl: process.env.REACT_APP_HELX_SEARCH_URL,
    }}>
      { children }
    </EnvironmentContext.Provider>
  )
}

export const useEnvironment = () => useContext(EnvironmentContext)
