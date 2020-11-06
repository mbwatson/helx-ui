import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHelxSearch } from './search-context'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const PaginationTray = () => {
  const { totalResults, currentPage, perPage, doSearch, goToPage } = useHelxSearch()
  
  const handleClickPageLink = pageNumber => event => {
    goToPage(pageNumber)
  }

  return (
    <Wrapper>
      {
        [...Array(Math.ceil(totalResults / perPage)).keys()].map(i => (
          <button key={ `page-${ i }` } onClick={ handleClickPageLink(i) } disabled={ currentPage === i }>{ i + 1 }</button>
        ))
      }
    </Wrapper>
  )
}

PaginationTray.propTypes = {}
