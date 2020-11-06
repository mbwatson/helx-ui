import React from 'react'
import { Container } from '../components/layout'
import { Title } from '../components/typography'
import { HelxSearch, SearchForm, SearchResults } from '../components/search'

export const Search = props => {
  const _query = props.query;
  return (
    <Container>
      <Title>Search</Title>

      <HelxSearch urlQuery={_query}>
        <SearchForm />
        <SearchResults />
      </HelxSearch>
    </Container>
  )
}
