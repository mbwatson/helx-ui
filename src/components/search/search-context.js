import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useEnvironment } from '../../contexts'

//

export const HelxSearchContext = createContext({})
export const useHelxSearch = () => useContext(HelxSearchContext)

//


//

export const HelxSearch = ({ urlQuery, children }) => {
  const { helxSearchUrl } = useEnvironment()
  const [query, setQuery] = useState('')
  const [isLoadingResults, setIsLoadingResults] = useState('')
  const [error, setError] = useState({})
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  //update url when pageNumber changes
  const goToPage = pageNumber => {
    window.location.replace(`/search/query=${query}&page=${pageNumber}`);
    setCurrentUrl(window.location.href);
  }

  //update query and currentPage state variable when url changes
  useEffect(() => {
    const urlParams = new URLSearchParams(urlQuery);
    setQuery(urlParams.get('query'));
    setCurrentPage(parseInt(urlParams.get('page')));
  },[currentUrl])

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
          console.log(currentPage);
          const hits = response.data.result.total_items === 0 ? [] : response.data.result.hits.hits.map(r => r._source)
          setResults(hits)
          setTotalResults(response.data.result.total_items)
          console.log(hits);
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
  }, [helxSearchUrl, currentUrl, query, setResults, setError, currentPage, perPage])

  //update query variable when search function is called
  const doSearch = q => {
    const trimmedQuery = q.trim()
    if (trimmedQuery !== '') {
      window.location.replace(`/search/query=${trimmedQuery}&page=${currentPage}`);
      setCurrentUrl(window.location.href);
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
