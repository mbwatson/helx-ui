import React, { Fragment } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHelxSearch } from './search-context'
import { LoadingSpinner } from '../loading-spinner'
import { Result } from './search-result'
import { PaginationTray } from './search-pagination-tray'
import { Link } from '../link'
import { Icon } from '../icon'

const Wrapper = styled.div``

export const SearchResults = () => {
  const { query, results, totalResults, perPage, currentPage, isLoadingResults, error } = useHelxSearch()
  const theme = useTheme()
  const link = (
    <Link to={ `/search?query=${ query }&page=${ currentPage }` } style={{ display: 'flex', alignItems: 'center', color: theme.color.primary.dark }}>
      <Icon icon="link" fill={ theme.color.primary.dark } size={ 24 } style={{ padding: '0 4px 0 0' }} />link to these results
    </Link>
  )

  return (
    <Wrapper>
      
      <br/><br/>

      { isLoadingResults && <LoadingSpinner /> }

      { !isLoadingResults && error && <span>{ error.message }</span> }

      {
        query && !isLoadingResults && !error.message && (
          <Fragment>
            <PaginationTray />
              { results.length } results for "{ query }" (total_items = { totalResults })
              <br/><br/>
              Page { currentPage } of { Math.ceil(totalResults / perPage) } ( { perPage } results per page )
              <br/><br/>
              { link }
              {
                results.map((result, i) => {
                  const index = (currentPage - 1) * perPage + i + 1
                  return <Result key={ `result-${ index }` } index={ index } result={ result } />
                })
              }
            <PaginationTray />
          </Fragment>
        )
      }

    </Wrapper>
  )
}
