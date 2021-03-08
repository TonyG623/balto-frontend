import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import axios from 'axios'
import Movies from "../src/pages/Movies";
import { waitFor } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";


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

let moviesMockData = [
  {
    cast: "Tony Grollo",
    director: 'Tony Grollo',
    title: 'My Movie',
    wiki: 'somewiki.com',
    genre: 'Comedy',
    plot: 'Suspensful things happen',
    id: 1,
    year: '1988',
    origin: "America"
  }
]


describe(`Movies page`, () => {
  let moviesMock
  let history = createMemoryHistory()
  history.push = jest.fn();
  let search_term = ""
  const renderComponent = ({
                             match = { params: { search_term: search_term } },
                             moviesMock = jest.fn(),
                           }) => {
    mockApi({
      moviesMock,
    })

    return render(
      <Router history={ history }>
        <Movies match={ match } history={history}/>
      </Router>
    )
  }

  beforeEach(() => {
    moviesMock = jest.fn().mockResolvedValue({ data: moviesMockData })
  })

  afterEach(() => {
    jest.resetAllMocks()
    cleanup()
  })

  test(`should show matching movies based on search term`, async () => {
    search_term = "Tony"
    const component = renderComponent({
      moviesMock
    })

    await waitFor(() => expect(component.getByText('My Movie')).toBeVisible())
  })

  test(`should redirect to movie page when clicking a movie.`, async () => {
    search_term = "Tony"
    const component = renderComponent({
      moviesMock
    })

    await waitFor(() => expect(component.getByText('My Movie')).toBeVisible())


    const row = document.querySelectorAll(
      "tbody > tr > td"
    )[0]
    userEvent.click(row)

    expect(history.push).toHaveBeenCalledWith('/movie/1');
  })
})
