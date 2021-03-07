import React, { Component } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import filterFactory from 'react-bootstrap-table2-filter'

const { SearchBar } = Search

export default class MoviesPage extends Component {

  initialState = {
    limit: 1000,
    skip: 0,
    currentApplication: {},
    loading: true,
    movies: {}
  }

  state = this.initialState

  async componentDidMount() {
    const search_term = this.props.match.params.search_term
    const { limit, skip } = this.state
    let response
    if (search_term) {
      response = await axios.get(`http://0.0.0.0:8080/moviesByTitle/${ search_term }`);
    } else {
      response = await axios.get(`http://0.0.0.0:8080/movies?limit=${ limit }&skip=${ skip }`);
    }
    const body = await response.data
    this.setState({ movies: body, loading: false });
  }

  fetchMoreMovies = async () => {
    this.setState({ loading: true })
    let { limit, skip, movies } = this.state
    const response = await axios.get(`http://0.0.0.0:8080/movies?limit=${ limit }&skip=${ skip += 100 }`);
    this.setState({ movies: movies.concat(response.data), skip: skip + 100, loading: false })
  };

  async handleRowClick(application) {
    let { history } = this.props
    history.push(`/movie/${ application.id }`)
  }

  render() {
    const { movies, loading } = this.state

    let rows = []

    const columns = [
      {
        dataField: 'title',
        text: 'Movie Title',
        attrs: {
          colSpan: 2,
        },
        headerAttrs: {
          colSpan: 2,
        },
        sort: true,
      }, {
        dataField: 'year',
        text: 'Year',
        attrs: {
          colSpan: 2,
        },
        headerAttrs: {
          colSpan: 2,
        },
        sort: true,
      }, {
        dataField: 'genre',
        text: 'Genre',
        attrs: {
          colSpan: 2,
        },
        headerAttrs: {
          colSpan: 2,
        },
        sort: true,
      },
    ]

    const rowEvents = {
      onClick: (e, application, rowIndex) => {
        this.handleRowClick(application)
      },
    }

    return (
      <>
        <ToolkitProvider bootstrap4 keyField="name" data={ movies } columns={ columns } search>
          { props => (
            <Container fluid="md">
              { loading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <BootstrapTable
                  hover
                  bordered
                  { ...props.baseProps }
                  rowEvents={ rowEvents }
                  filter={ filterFactory() }
                />
              ) }
            </Container>
          ) }
        </ToolkitProvider>
      </>
    )
  }
}
