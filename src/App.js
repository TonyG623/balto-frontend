import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Navigation from "./components/Navigation";


function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route exact path="/movie" component={ Movie }/>
          <Route exact path="/movie/:id" component={ Movie }/>
          <Route exact path="/" component={ Movies }/>
          <Route exact path="/movies" component={ Movies }/>
          <Route exact path="/movies/:search_term" component={ Movies }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;