import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useHelxSearch } from './search-context'
import { LoadingSpinner } from '../loading-spinner'
import { Result } from './search-result'

const Wrapper = styled.div``

export const SearchResults = () => {
  const { query, results, totalResults, perPage, currentPage, isLoadingResults, error } = useHelxSearch()
  return (
    <Wrapper>
      
      <br/><br/>

      { isLoadingResults && <LoadingSpinner /> }

      { !isLoadingResults && error && <span>{ error.message }</span> }

      {
        !isLoadingResults && !error.message && (
          <Fragment>
            { totalResults } results for "{ query }"
            <br/><br/>
            Page { currentPage + 1 } of { Math.ceil(totalResults / perPage) } ( { perPage } results per page )
            <br/><br/>
            {
              [...Array(Math.ceil(totalResults / perPage)).keys()].map(i => 
                <span key={ `page-${ i }` } style={{ padding: '1rem' }}>
                  { currentPage === i ? i + 1 : <a href="#">{ i + 1 }</a> }
                </span>
              )
            }
            <br/><br/>
            {
              results.map((result, i) => <Result key={ `result-${ currentPage * perPage + i }` }index={ currentPage * perPage + i } result={ result } />)
            }
          </Fragment>
        )
      }

    </Wrapper>
  )
}
