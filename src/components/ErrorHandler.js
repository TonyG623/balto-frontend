import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

export default class ErrorHandler extends Component {
  initialState = {}

  state = this.initialState

  componentDidMount() {
  }

  render() {
    const { error } = this.props
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>
          { error }
        </p>
      </Alert>
    )
  }
}

