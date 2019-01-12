import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Reservar from './pages/Reservar';
import Menu from './components/Menu';
import Cartao from './pages/Cartao';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/reserva/:id' component={Reservar} />
            <Route path='/cartao' component={Cartao} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
