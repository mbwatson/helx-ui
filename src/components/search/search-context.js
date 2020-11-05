import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useEnvironment } from '../../contexts'

//

export const HelxSearchContext = createContext({})
export const useHelxSearch = () => useContext(HelxSearchContext)

//


//

export const HelxSearch = ({ children }) => {
  const { helxSearchUrl } = useEnvironment()
  const [query, setQuery] = useState('')
  const [isLoadingResults, setIsLoadingResults] = useState('')
  const [error, setError] = useState({})
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, ] = useState(5)

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoadingResults(true)
      try {
        const params = {
          index: 'test',
          query: query,
          offset: currentPage * perPage,
          size: perPage,
        }
        const response = await axios.post(helxSearchUrl, params)
        if (response.status === 200 && response.data.result) {
          console.log(response.data.result.total_items)
          const hits = response.data.result.total_items === 0 ? [] : response.data.result.hits.hits.map(r => r._source)
          setResults(hits)
          setTotalResults(response.data.result.total_items)
        } else {
          setResults([])
        }
      } catch (error) {
        console.log(error)
        setError({ message: 'An error occurred!' })
      }
      setCurrentPage(0)
      setIsLoadingResults(false)
    }
    if (query) {
      fetchResults()
    }
  }, [helxSearchUrl, query, setResults, setError, currentPage, perPage])

  const doSearch = q => {
    const trimmedQuery = q.trim()
    if (trimmedQuery !== '') {
      setQuery(trimmedQuery)
    }
  }

  return (
    <HelxSearchContext.Provider value={{
      query, error, isLoadingResults, results, totalResults, currentPage, perPage, doSearch, goToPage
    }}>
      { children }
    </HelxSearchContext.Provider>
  )
}
