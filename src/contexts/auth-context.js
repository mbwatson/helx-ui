import React, { createContext, useContext, useEffect, useState } from 'react'

const HISTORY_SIZE = 10

export const AuthContext = createContext({ })

const initialUser = {
  username: 'some user',
  email: 'email@ddr.ess',
  preferences: {
    mode: 'light',
    apps: [],
  },
  search: {
    favorites: [
      "{\"query\":\"heart\",\"page\":1}",
      "{\"query\":\"lung\",\"page\":1}",
      "{\"query\":\"blood\",\"page\":3}"
    ],
    history: [],
  },
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

  const favoriteSearchHandler = (query, page) => event => {
    const searchData = JSON.stringify({ query, page })
    let newSavedSearches = [...user.search.favorites]
    const index = newSavedSearches.indexOf(searchData)
    if (index > -1) {
      // found? remove it
      newSavedSearches = [...newSavedSearches.slice(0, index), ...user.search.favorites.slice(index + 1)]
    } else {
      // not found? add it
      newSavedSearches = [...newSavedSearches, searchData]
    }
    setUser({
      ...user,
      search: {
        ...user.search,
        favorites: newSavedSearches,
      },
    })
  }

  const updateSearchHistory = query => {
    if (user) {
      const newSearchItem = {
        query: query,
        timestamp: new Date()
      }
      const newSearchHistory = [JSON.stringify(newSearchItem), ...user.search.history].slice(0, HISTORY_SIZE)
      setUser({
        ...user,
        search: {
          ...user.search,
          history: newSearchHistory,
        },
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user: user, login: loginHandler, logout: logoutHandler, saveSearch: favoriteSearchHandler, updateSearchHistory }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

