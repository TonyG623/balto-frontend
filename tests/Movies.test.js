import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import axios from 'axios'
import Movies from "../src/pages/Movies";

jest.mock('axios')

const mockApi = (
  { moviesMock = jest.fn(), }) => {
  axios.get.mockImplementation(async (url, params) => {
    // have to use includes because they have queries at the end of them
    if (url.includes('/movies')) {
      return moviesMock(params)
    }
  })
}

const moviesMockData = [
  {
    cast: "Tony Grollo",
    director: 'Tony Grollo',
    title: 'My Movie',
    wiki:'somewiki.com',
    genre: 'Comedy',
    plot:'Suspensful things happen',
    id: 1,
    year: '1988',
    origin: "America"
  }
]


describe(`Movies page test`, () => {
  let moviesMock

  const renderComponent = ({
                             moviesMock,
                           }) => {
    mockApi({
      moviesMock,
    })
    return render(
      <Movies/>
    )
  }

  beforeEach(() => {
    moviesMock = jest.fn().mockResolvedValue({ data: moviesMockData })

  })

  afterEach(() => {
    jest.resetAllMocks()
    cleanup()
  })

  test(`should render movies page`, async () => {
    const component = renderComponent({
      moviesMock
    })

  })
})
