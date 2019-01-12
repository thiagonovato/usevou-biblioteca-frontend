import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Livros from './pages/Livros';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Livros} />
        </Switch>
      </Router>
    );
  }
}

export default App;
