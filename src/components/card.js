import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div(({ theme }) => `
  border-radius: ${ theme.border.radius };
  border: 1px solid ${ theme.color.grey.light };
  overflow: hidden;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));
  transition: filter 250ms;
  &:hover {
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
  }
`)

const CardHeader = styled.header(({ theme }) => `
  background-color: ${ theme.color.grey.light };
  padding: ${ theme.spacing.medium };
  font-weight: bold;
`)

const CardBody = styled.div(({ theme }) => `
  background-color: #fff;
  padding: ${ theme.spacing.medium };
`)

const CardFooter = styled.footer(({ theme }) => `
  background-color: ${ theme.color.grey.dark };
  padding: ${ theme.spacing.medium };
`)

class Card extends Component {
  static Header = CardHeader;
  static Body = CardBody;
  static Footer = CardFooter;

  render() {
    return (
      <Wrapper>
        { this.props.children }
      </Wrapper>
    )
  }
}

export { Card }
