import React, { Component } from 'react'
import { Col, Container, Form, Spinner } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import Row from "react-bootstrap/Row";
import ErrorHandler from "../components/ErrorHandler";

export default class MoviePage extends Component {
  initialState = {
    loading: true,
    movie: {},
    not_found: false,
    error: ''
  }

  state = this.initialState

  async componentDidMount() {
    const { id } = this.props.match.params
    try {
      const response = await axios.get(`http://0.0.0.0:8080/movie/${ id }`);
      const body = await response.data
      this.setState({ movie: body, loading: false });
    } catch (err) {
      this.setState({ movie: {}, loading: false });
    }
  }

  changeHandler = event => {
    event.persist();

    let value = event.target.value;

    this.setState(prevState => ({
      movie: { ...prevState.movie, [event.target.name]: value }
    }))
  };

  deleteMovie = async () => {
    this.setState({ loading: true })
    let { movie, error } = this.state
    try {
      await axios.delete(`http://0.0.0.0:8080/movie/${ movie.id }`);
      this.setState({ movie: {}, not_found: true, loading: false, error })
    } catch (err) {
      error = `Unable to delete movie: ${ err }`
      this.setState({ not_found: true, loading: false, error })
    }
  };

  updateMovie = async () => {
    this.setState({ loading: true })
    let { movie, error } = this.state
    let response
    try {
      response = await axios.put(`http://0.0.0.0:8080/movie/${ movie.id }`, movie);
      this.setState({ movie: response.data, loading: false })

    } catch (err) {
      error = `Unable to update movie: ${ err }`
      this.setState({ loading: false, error })

    }
  };

  addMovie = async () => {
    this.setState({ loading: true })
    let { error, movie } = this.state
    let response

    try {
      response = await axios.post(`http://0.0.0.0:8080/movie/`, movie);
      this.setState({ movie: response.data, loading: false, error })
    } catch (err) {
      error = `Unable to add movie: ${ err }`
      this.setState({ loading: false, error })
    }
  };

  render() {
    const { loading, movie, error } = this.state
    console.log(movie)

    return loading ? (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    ) : (
      <>
        <Container className="mb-12" style={ { marginTop: '2rem' } }>
          { error && <ErrorHandler error={error}/> }
          <Form>
            <Form.Row>
              <Form.Group as={ Col } controlId="formGridEmail">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control name="title" type="text" value={ movie.title } onChange={ this.changeHandler }/>
                <Form.Label>Year</Form.Label>
                <Form.Control name="year" type="text" value={ movie.year } onChange={ this.changeHandler }/>
                <Form.Label>Origin</Form.Label>
                <Form.Control name="origin" type="text" value={ movie.origin } onChange={ this.changeHandler }/>
                <Form.Label>Genre</Form.Label>
                <Form.Control name="genre" type="text" value={ movie.genre } onChange={ this.changeHandler }/>
                <Form.Label>Director</Form.Label>
                <Form.Control name="director" type="text" value={ movie.director } onChange={ this.changeHandler }/>
                <Form.Label>Cast</Form.Label>
                <Form.Control name="cast" type="text" value={ movie.cast } onChange={ this.changeHandler }/>
                <Form.Label>Wiki</Form.Label>
                <Form.Control name="wiki" type="text" value={ movie.wiki } onChange={ this.changeHandler }/>
                <Form.Label>Plot</Form.Label>
                <Form.Control name="plot" type="textarea" value={ movie.plot } onChange={ this.changeHandler }/>
              </Form.Group>
            </Form.Row>


            <Row>
              { movie.id ?
                (
                  <>
                    <Button variant="primary" class="btn-toolbar" type="submit" onClick={ this.updateMovie }>
                      Update
                    </Button>
                    <Button variant="danger" class="btn-toolbar" type="submit" onClick={ this.deleteMovie }>
                      Delete
                    </Button>
                  </>) :
                (
                  <>
                    <Button variant="primary" class="btn-toolbar" type="submit" onClick={ this.addMovie }>
                      Add
                    </Button>
                  </>
                )
              }
            </Row>
          </Form>
        </Container>
      </>
    )
  }
}
