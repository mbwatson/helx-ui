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
  const { totalResults, currentPage, perPage } = useHelxSearch()
  return (
    <Wrapper>
      {
        [...Array(Math.ceil(totalResults / perPage)).keys()].map(i => 
          <span key={ `page-${ i }` } style={{ padding: '1rem' }}>
            { currentPage === i ? i + 1 : <a href="#">{ i + 1 }</a> }
          </span>
        )
      }
    </Wrapper>
  )
}

PaginationTray.propTypes = {}
