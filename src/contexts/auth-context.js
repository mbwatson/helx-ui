import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useEnvironment } from './environment-context';

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
  refesh_token: '',
  access_token: ''
}

export const AuthProvider = ({ children }) => {
  const helxAppstoreUrl = useEnvironment().helxAppstoreUrl;
  const [user, setUser] = useState();

  const loginHandler = async (credentials) => {
    console.log('Logging in...')
    const login_response = await axios({
      method: 'POST',
      url: `${helxAppstoreUrl}/api/token/`,
      data:{
      username: credentials[0],
      password: credentials[1]
    }
  }).then(res => {
      let loggedInUser = JSON.parse(JSON.stringify(initialUser));
      loggedInUser.refesh_token = res.data.refesh;
      loggedInUser.access_token = res.data.access;
      loggedInUser.username = credentials[0];
      setUser(loggedInUser);
    }).catch(e => {
      alert("Username and password does not match. Please try again.")
    })
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

