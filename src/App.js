// Importação de libs
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Importação de componentes
import Home from './pages/Home';
import Reservar from './pages/Reservar';
import Menu from './components/Menu';
import Cartao from './pages/Cartao';
import Filtro from './pages/Filtro';
import ListaReserva from './pages/Listareserva';
import DetalhesBuscaReserva from './pages/DetalhesBuscaReserva';

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
            <Route path='/filtro' component={Filtro} />
            <Route path='/listareserva' component={ListaReserva} />
            <Route path='/detalhesreserva/:id' component={DetalhesBuscaReserva} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
