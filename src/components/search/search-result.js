import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

const Wrapper = styled.article`
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  & .index {
    padding: 0 1rem;
    min-width: 3rem;
    display: flex;
    justify-content: flex-end;
  }
  & .details {
    flex: 1;
  }
  & .react-json-view {
    padding: 1rem;
  }
`

export const Result = ({ index, result }) => {
  return (
    <Wrapper>
      <div className="index">{ index }</div>
      <div className="details">
        { result.tag_id }
        <ReactJson src={ result } collapsed={ true } enableClipboard={ false } theme="monokai" />
      </div>
    </Wrapper>
  )
}

Result.propTypes = {

}
