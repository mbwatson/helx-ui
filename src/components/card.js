import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div(({ theme }) => `
  border-radius: ${ theme.border.radius };
  border: 1px solid ${ theme.color.grey.light };
`)

const CardHeader = styled.header(({ theme }) => `
  background-color: ${ theme.color.grey.light };
  padding: ${ theme.spacing.small };
  font-weight: bold;
`)

const CardBody = styled.div(({ theme }) => `
  background-color: #fff;
  padding: ${ theme.spacing.small };
`)

const CardFooter = styled.footer(({ theme }) => `
  background-color: ${ theme.color.grey.light };
  padding: ${ theme.spacing.small };
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
