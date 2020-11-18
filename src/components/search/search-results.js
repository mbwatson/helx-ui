import React, { Fragment, useMemo } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { useHelxSearch } from './search-context'
import { Paragraph } from '../typography'
import { LoadingSpinner } from '../loading-spinner'
import { Result } from './search-result'
import { PaginationTray } from './search-pagination-tray'
import { Link } from '../link'
import { Icon } from '../icon'

const Wrapper = styled.div``

const Meta = styled.div(({ theme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${ theme.color.grey.light };
  margin-bottom: ${ theme.spacing.xl };
  @media (min-width: 600px) {
    justify-content: space-between;
    flex-direction: row;
  }
  animation: ${ theme.animation.fadeIn };
`)

export const SearchResults = () => {
  const theme = useTheme()
  const { query, results, totalResults, perPage, currentPage, pageCount, isLoadingResults, error } = useHelxSearch()

  const MemoizedLink = useMemo(() => (
    <Link to={ `/search?q=${ query }&p=${ currentPage }` } style={{ display: 'inline-flex', alignItems: 'center', color: theme.color.primary.dark }}>
      <Icon icon="link" fill={ theme.color.primary.dark } size={ 24 } style={{ padding: '0 4px 0 0' }} />shareable link to these results
    </Link>
  ), [query, currentPage, theme.color.primary.dark])

  return (
    <Wrapper>
      <Paragraph align="center">
        { isLoadingResults ? '...' : totalResults } results for "{ isLoadingResults ? '...' : query }" ({ isLoadingResults ? '...' : pageCount } pages)
      </Paragraph>

      <PaginationTray />

      <br/>

      { isLoadingResults && <LoadingSpinner /> }

      { !isLoadingResults && error && <span>{ error.message }</span> }

      {
        query && !isLoadingResults && !error.message && (
          <Fragment>
            {
              results.length >= 1 && (
                <Meta>
                  <div>Results { (currentPage - 1) * perPage + 1 } to { (currentPage - 1) * perPage + results.length } of { totalResults } total results</div>
                  <div>{ MemoizedLink }</div>
                </Meta>
              )
            }
            {
              results.map((result, i) => {
                const index = (currentPage - 1) * perPage + i + 1
                return <Result key={ `result-${ index }` } index={ index } result={ result } />
              })
            }
          </Fragment>
        )
      }

      <br/><br/>

      <PaginationTray />

      <br/><br/>

    </Wrapper>
  )
}
