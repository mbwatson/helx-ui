import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext({ })

const initialUser = {
  username: 'some user',
  email: 'email@ddr.ess',
  preferences: {
    mode: 'light',
    apps: [],
  },
  savedSearches: [
    "{\"query\":\"heart\",\"page\":1}",
    "{\"query\":\"lung\",\"page\":1}",
    "{\"query\":\"blood\",\"page\":3}"
  ],
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

  const saveSearchHandler = (query, page) => event => {
    const searchData = JSON.stringify({ query, page })
    let newSavedSearches = [...user.savedSearches]
    const index = newSavedSearches.indexOf(searchData)
    if (index > -1) {
      // found? remove it
      newSavedSearches = [...newSavedSearches.slice(0, index), ...user.savedSearches.slice(index + 1)]
    } else {
      // not found? add it
      newSavedSearches = [...newSavedSearches, searchData]
    }
    setUser({ ...user, savedSearches: newSavedSearches })
  }

  return (
    <AuthContext.Provider value={{ user: user, login: loginHandler, logout: logoutHandler, saveSearch: saveSearchHandler }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

