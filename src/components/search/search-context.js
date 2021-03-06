import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from '@reach/router'
import { useAuth, useEnvironment } from '../../contexts'

//

export const HelxSearchContext = createContext({ })
export const useHelxSearch = () => useContext(HelxSearchContext)

//

const PER_PAGE = 10

//

export const HelxSearch = ({ children }) => {
  const { helxSearchUrl } = useEnvironment()
  const [query, setQuery] = useState('')
  const [isLoadingResults, setIsLoadingResults] = useState('')
  const [error, setError] = useState({})
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const auth = useAuth()
  const inputRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    // this lets the user press backslash to jump focus to the search box
    const handleKeyPress = event => {
      if (event.keyCode === 220) { // backslash ("\") key 
        if (inputRef.current) {
          event.preventDefault()
          inputRef.current.select()
          window.scroll({ top: 40 })
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    setQuery(queryParams.get('q') || '')
    setCurrentPage(+queryParams.get('p') || 1)
  }, [window.location.search])

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoadingResults(true)
      try {
        const params = {
          index: 'test',
          query: query,
          offset: (currentPage - 1) * PER_PAGE,
          size: PER_PAGE,
        }
        const response = await axios.post(helxSearchUrl, params)
        // TODO: fixing total_items in API response will fix the pagination/total_items mismatch
        if (response.status === 200 && response.data.status === 'success' && response.data.result && response.data.result.hits) {
          const hits = response.data.result.hits.hits.map(r => r._source)
          setResults(hits)
          setTotalResults(response.data.result.total_items)
        } else {
          setResults([])
          setTotalResults(0)
        }
      } catch (error) {
        console.log(error)
        setError({ message: 'An error occurred!' })
      }
      setIsLoadingResults(false)
    }
    fetchResults()
  }, [query, currentPage, helxSearchUrl, setResults, setError])

  useEffect(() => {
    setPageCount(Math.ceil(totalResults / PER_PAGE))
  }, [totalResults])

  const doSearch = queryString => {
    const trimmedQuery = queryString.trim()
    if (trimmedQuery !== '') {
      setQuery(trimmedQuery)
      setCurrentPage(1)
      auth.updateSearchHistory(trimmedQuery)
      navigate(`/search?q=${ trimmedQuery }&p=1`)
    }
  }

  return (
    <HelxSearchContext.Provider value={{ query, setQuery, error, isLoadingResults, results, totalResults, currentPage, setCurrentPage, perPage: PER_PAGE, pageCount, doSearch, inputRef }}>
      { children }
    </HelxSearchContext.Provider>
  )
}
