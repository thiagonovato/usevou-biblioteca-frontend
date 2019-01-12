// Importação de libs
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends Component {
    render() {
        return (
            <nav className="nav">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/filtro">Filtro</Link>
                <Link className="nav-link" to="/cartao">Consultar Cartão</Link>
                <Link className="nav-link" to="/listareserva">Lista das Reservas</Link>
            </nav>
        )
    }
}