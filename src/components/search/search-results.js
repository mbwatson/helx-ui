import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useHelxSearch } from './search-context'

const Wrapper = styled.div``

export const SearchResults = () => {
  const { query, results, totalResults, isLoadingResults, error } = useHelxSearch()
  return (
    <Wrapper>
      
      <br/><br/>

      { isLoadingResults && 'Searching...' }

      { !isLoadingResults && error && <span>{ error.message }</span> }

      {
        !isLoadingResults && !error.message && (
          <Fragment>
            { totalResults } results for "{ query }"
            <br/><br/>
            <pre>{ JSON.stringify(results, null, 2) }</pre>
          </Fragment>
        )
      }

    </Wrapper>
  )
}
