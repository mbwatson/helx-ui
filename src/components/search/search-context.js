import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useEnvironment } from '../../contexts'

//

export const HelxSearchContext = createContext({})
export const useHelxSearch = () => useContext(HelxSearchContext)

//

const PER_PAGE = 20

//

export const HelxSearch = ({ children }) => {
  const { helxSearchUrl } = useEnvironment()
  const [query, setQuery] = useState('')
  const [isLoadingResults, setIsLoadingResults] = useState('')
  const [error, setError] = useState({})
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoadingResults(true)
      try {
        const params = {
          index: 'test',
          query: query,
          offset: 0,
          size: PER_PAGE,
        }
        const response = await axios.post(helxSearchUrl, params)
        if (response.status === 200 && response.data.result) {
          const hits = response.data.result.total_items === 0 ? [] : response.data.result.hits.hits.map(r => r._source)
          setResults(hits)
          setTotalResults(hits.length)
        } else {
          setResults([])
        }
      } catch (error) {
        console.log(error)
        setError({ message: 'An error occurred!' })
      }
      setIsLoadingResults(false)
    }
    if (query) {
      fetchResults()
    }
  }, [helxSearchUrl, query, setResults, setError])

  const doSearch = q => {
    const trimmedQuery = q.trim()
    if (trimmedQuery !== '') {
      setQuery(trimmedQuery)
    }
  }

  return (
    <HelxSearchContext.Provider value={{ query, error, isLoadingResults, results, totalResults, doSearch }}>
      { children }
    </HelxSearchContext.Provider>
  )
}
