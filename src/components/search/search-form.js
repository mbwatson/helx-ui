import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../input'
import { Button } from '../button'
import { useHelxSearch } from './search-context'
import { InputGroup } from '../input-group'

export const SearchForm = () => {
  const [query, setQuery] = useState('')
  const { doSearch } = useHelxSearch()

  const handleChangeQuery = event => setQuery(event.target.value)

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch(query)
    }
  }

  return (
    <InputGroup>
      <Input value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } style={{ flex: 1 }} />
      <Button small onClick={ () => doSearch(query) }>Search</Button>
    </InputGroup>
  )
}
