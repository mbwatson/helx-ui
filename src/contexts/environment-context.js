import React, { createContext, useContext, useState } from 'react'

export const EnvironmentContext = createContext({ })

export const EnvironmentProvider = ({ children }) => {
  return (
    <EnvironmentContext.Provider value={{
      testVariable: process.env.REACT_APP_TEST_ENV_VAR
    }}>
      { children }
    </EnvironmentContext.Provider>
  )
}

export const useEnvironment = () => useContext(EnvironmentContext)
