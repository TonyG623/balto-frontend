import React, { Component } from 'react'
import { Col, Container, Form, Spinner } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import Row from "react-bootstrap/Row";

export default class MoviePage extends Component {

  initialState = {
    loading: true,
    movie: {},
    not_found: false
  }

  state = this.initialState

  async componentDidMount() {
    const { id } = this.props.match.params
    try {
      const response = await axios.get(`http://0.0.0.0:8080/movie/${ id }`);
      const body = await response.data
      this.setState({ movie: body, loading: false });
    } catch (err) {
      this.setState({ movie: {}, not_found: true, loading: false });
    }
  }

  changeHandler = event => {
    event.persist();

    let value = event.target.value;

    this.setState(prevState => ({
      movie: { ...prevState.movie,  [event.target.name]: value }
    }))
  };

  deleteMovie = async () => {
    this.setState({ loading: true })
    const { movie } = this.state
    await axios.delete(`http://0.0.0.0:8080/movie/${ movie.id }`);
    this.setState({ movie: {}, not_found: true, loading: false })
  };

  updateMovie = async () => {
    this.setState({ loading: true })
    const { movie } = this.state
    const response = await axios.put(`http://0.0.0.0:8080/movie/${ movie.id }`, movie);
    this.setState({ movie: response.data, loading: false })
  };

  render() {
    const { loading, movie, not_found } = this.state

    return loading ? (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    ) : !not_found ? (
      <>
        <Container className="mb-12" style={ { marginTop: '2rem' } }>
          <Form>
            <Form.Row>
              <Form.Group as={ Col } controlId="formGridEmail">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control name="title" type="text" value={ movie.title } onChange={this.changeHandler}/>
                <Form.Label>Year</Form.Label>
                <Form.Control name="year" type="text" value={ movie.year } onChange={this.changeHandler}/>
                <Form.Label>Origin</Form.Label>
                <Form.Control name="origin" type="text" value={ movie.origin } onChange={this.changeHandler}/>
                <Form.Label>Genre</Form.Label>
                <Form.Control name="genre" type="text" value={ movie.genre } onChange={this.changeHandler}/>
                <Form.Label>Director</Form.Label>
                <Form.Control name="director" type="text" value={ movie.director } onChange={this.changeHandler}/>
                <Form.Label>Wiki</Form.Label>
                <Form.Control name="wiki" type="text" value={ movie.wiki } onChange={this.changeHandler}/>
                <Form.Label>Plot</Form.Label>
                <Form.Control name="plot" type="textarea" value={ movie.plot } onChange={this.changeHandler}/>
              </Form.Group>
            </Form.Row>

            <Row>
              <Button variant="primary" class="btn-toolbar" type="submit" onClick={ this.updateMovie }>
                Update
              </Button>
              <Button variant="danger" class="btn-toolbar" type="submit" onClick={ this.deleteMovie }>
                Delete
              </Button>
            </Row>
          </Form>
        </Container>
      </>
    ) : (
      <h2> This movie was not found in the database. </h2>
    )
  }
}
