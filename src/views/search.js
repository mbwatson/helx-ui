import React from 'react'
import { Container } from '../components/layout'
import { Title } from '../components/typography'
import { HelxSearch, SearchForm, SearchResults } from '../components/search'
import { Link } from '../components/link'

export const Search = () => {
  return (
    <Container>
      <Title>Search</Title>

      <strong>Test Links</strong>
      
      <div><Link to="/search?q=heart&p=1">{ window.location.protocol }//{ window.location.host }/search?q=heart&p=1</Link></div>
      <div><Link to="/search?q=lung&p=1">{ window.location.protocol }//{ window.location.host }/search?q=lung&p=1</Link></div>
      <div><Link to="/search?q=blood&p=1">{ window.location.protocol }//{ window.location.host }/search?q=blood&p=1</Link></div>

      <br/><br/>

      <HelxSearch >
        <SearchForm />

        <br /><br /><br />
        
        <SearchResults />
      
      </HelxSearch>
    </Container>
  )
}
