import React, { Component } from 'react'
import { Button, Form, FormControl, Nav, Navbar, Spinner } from 'react-bootstrap'

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

class Navigation extends Component {
  initialState = {
    loading: true,
    search_term: "",
  }

  state = this.initialState

  componentDidMount() {
    this.setState({ loading: false })
  }

  changeHandler = event => {
    event.persist();

    let value = event.target.value;
    console.log(value)

    this.setState({
      search_term: value
    })
  };

  handleSearch = async () => {
    const { history } = this.props
    history.push(`/movies/${ this.state.search_term }`)
    this.setState({ search_term: "" })
  }

  render() {
    const { loading } = this.state

    return (
      loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/movies">Movie Searcher</Navbar.Brand>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/movie">Add Movie</Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline onSubmit={ this.handleSearch }>
              <FormControl type="text" placeholder="Search by Movie Title" onChange={ this.changeHandler }
                           className="mr-sm-2"/>
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      )
    )
  }
}

export default withRouter(Navigation);