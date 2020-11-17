import React, { createContext, useContext } from 'react'
import { useRegistry } from '../hooks'

export const EnvironmentContext = createContext({ })

export const EnvironmentProvider = ({ children }) => {
  const { context } = useRegistry(process.env.REACT_APP_CONTEXT)

  return (
    <EnvironmentContext.Provider value={{
      helxSearchUrl: process.env.REACT_APP_HELX_SEARCH_URL,
      context: context,
    }}>
      { children }
    </EnvironmentContext.Provider>
  )
}

export const useEnvironment = () => useContext(EnvironmentContext)
