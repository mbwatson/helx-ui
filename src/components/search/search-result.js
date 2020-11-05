import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

const Wrapper = styled.article`
  margin: 1rem 0;
  & .react-json-view {
    padding: 1rem;
  }
`

export const Result = ({ index, result }) => {
  return (
    <Wrapper>
      <div className="index">{ index }</div>
      <ReactJson src={ result } collapsed={ true } theme="monokai" />
    </Wrapper>
  )
}

Result.propTypes = {

}
