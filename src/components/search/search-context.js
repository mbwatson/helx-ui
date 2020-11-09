import React, { createContext, useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
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

  //update url and currentPage state when pageNumber changes
  const goToPage = pageNumber => {
    navigate(`/search/query=${query}&page=${pageNumber}`);
    setCurrentPage(pageNumber);
  }

  //update query and currentPage state variable when url reloads
  useEffect(() => {
    const urlParams = new URLSearchParams(urlQuery);
    console.log(urlParams.get('query'))
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
        console.log(response);
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

  //update url and query state when search function is called
  const doSearch = q => {
    const trimmedQuery = q.trim()
    if (trimmedQuery !== '') {
      navigate(`/search/query=${trimmedQuery}&page=${currentPage}`);
      setQuery(trimmedQuery);
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
