import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from '@reach/router'
import { useEnvironment } from '../../contexts'

//

export const HelxSearchContext = createContext({})
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
  const navigate = useNavigate()
  const perPage = PER_PAGE
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    setQuery(queryParams.get('q') || '')
    setCurrentPage(+queryParams.get('p') || 1)
  }, [window.location.href])

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoadingResults(true)
      try {
        const params = {
          index: 'test',
          query: query,
          offset: (currentPage - 1) * perPage,
          size: perPage,
        }
        const response = await axios.post(helxSearchUrl, params)
        // TODO: fixing total_items in API response will fix the pagination/total_items mismatch
        if (response.status === 200 && response.data.status === 'success' && response.data.result && response.data.result.hits) {
          const hits = response.data.result.hits.hits.map(r => r._source)
          setResults(hits)
          setTotalResults(response.data.result.total_items)
        } else {
          setResults([])
        }
      } catch (error) {
        console.log(error)
        setError({ message: 'An error occurred!' })
      }
      setIsLoadingResults(false)
    }
    fetchResults()
  }, [query, currentPage, helxSearchUrl, setResults, setError])

  const doSearch = queryString => {
    const trimmedQuery = queryString.trim()
    if (trimmedQuery !== '') {
      setQuery(trimmedQuery)
      setCurrentPage(1)
      navigate(`/search?q=${ trimmedQuery }&p=1`)
    }
  }

  return (
    <HelxSearchContext.Provider value={{ query, setQuery, error, isLoadingResults, results, totalResults, currentPage, setCurrentPage, perPage, doSearch }}>
      { children }
    </HelxSearchContext.Provider>
  )
}
