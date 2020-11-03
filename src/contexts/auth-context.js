import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({ })

const initialUser = {
  username: 'some user',
  email: 'email@ddr.ess',
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser)

  const loginHandler = () => {
    console.log('Logging in...')
    setUser(initialUser)
  }

  const logoutHandler = () => {
    console.log('Logging out...')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user: user, login: loginHandler, logout: logoutHandler }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

