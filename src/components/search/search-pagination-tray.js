import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import styled, { useTheme } from 'styled-components'
import { useHelxSearch } from './search-context'
import { Icon } from '../icon'
import { Button } from '../button'
import { Link } from '../link'

const Wrapper = styled.div(({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & a {
    margin: 0 ${ theme.spacing.small };
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16pt;
  }
  & svg {
    pointer-events: none;
    min-width: 2.0rem;
    min-height: 2rem;    
  }
`)

const PaginationLink = ({ to, icon, disabled, children }) => {
  const theme = useTheme()
  if (icon) {
    return (
      <Link to={ to } style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
        <Icon icon={ icon } size={ 16 } fill={ disabled ? theme.color.grey.main : theme.color.primary.dark } />
      </Link>
    )
  }
  return <Link to={ to }>{ children }</Link>
}


export const PaginationTray = () => {
  const theme = useTheme()
  const { query, totalResults, currentPage, perPage, doSearch, setCurrentPage } = useHelxSearch()
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setPageCount(Math.ceil(totalResults / perPage))
  }, [totalResults, perPage])
  
  const handleClickPageLink = pageNumber => event => {
    navigate(`/search?q=${ query }&p=${ pageNumber }`)
  }

  return (
    <Wrapper>
      <PaginationLink to={ `/search?q=${ query }&p=1` } icon="firstPage" disabled={ currentPage <= 1 }/>
      <PaginationLink to={ `/search?q=${ query }&p=${ currentPage - 1 }` } icon="chevronLeft" disabled={ currentPage <= 1 }/>
      {
        [...Array(pageCount).keys()].map(i => (
          <PaginationLink to={ `/search?q=${ query }&p=${ i + 1 }` }>{ i + 1 }</PaginationLink>
        ))
      }
      <PaginationLink to={ `/search?q=${ query }&p=${ currentPage + 1 }` } icon="chevronRight" disabled={ currentPage >= pageCount }/>
      <PaginationLink to={ `/search?q=${ query }&p=${ currentPage }` } icon="lastPage" disabled={ currentPage >= pageCount }/>
    </Wrapper>
  )
}

PaginationTray.propTypes = {}
