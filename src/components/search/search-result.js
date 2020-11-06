import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

const Wrapper = styled.article`
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  & .index {
    padding: 1rem;
  }
  & .react-json-view {
    flex: 1;
    padding: 1rem;
  }
`

export const Result = ({ index, result }) => {
  return (
    <Wrapper>
      <div className="index">{ index+1 }</div>
      <ReactJson src={ result } collapsed={ true } enableClipboard={ false } theme="monokai" />
    </Wrapper>
  )
}

Result.propTypes = {

}
