import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../input'
import { Button } from '../button'
import { useHelxSearch } from './search-context'

const Wrapper = styled.div``

export const SearchForm = () => {
  const [query, setQuery] = useState()
  const { doSearch } = useHelxSearch()

  const handleChangeQuery = event => setQuery(event.target.value)

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch(query)
    }
  }

  return (
    <Wrapper>
      <Input value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      &nbsp;
      <Button small onClick={ () => doSearch(query) }>Search</Button>
    </Wrapper>
  )
}
