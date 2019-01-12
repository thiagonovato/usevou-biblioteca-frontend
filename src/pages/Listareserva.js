// Importação de libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Importando classes de configurações
import api from '../services/api';

class ListaReserva extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livros: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        api
            .get('listareservas')
            .then((res) => {
                let chave = '';
                const objetos = Object
                    .keys(res.data.reserva)
                    .map(key => {
                        chave = res.data.reserva[key].idlivro;
                        return {
                            id: key,
                            ...res.data.reserva[key]
                        }
                    })

                this.setState({
                    isLoading: false,
                    livros: objetos
                })

            })

    }

    render() {
        let index = 0
        return (
            <div>
                <div className='container'>
                    <h3>Lista das Reservas</h3>
                    <div className='row'>
                        <div>
                            {this.state.isLoading && <h4>Carregando...</h4>}
                        </div>
                        {!this.state.isLoading &&
                            <div className='row'>
                                {
                                    this.state.livros.map((livro, indice) => {
                                        return [
                                            <div className="m-2 col-sm" key={indice}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <p className="card-text">Nr cartão: {livro.nrcartao}</p>
                                                        <p className="card-text">Data: {livro.date}</p>
                                                        <Link to={'/detalhesreserva/' + livro.idlivro} className="btn btn-primary btn-sm">Mais detalhes</Link>
                                                    </div>
                                                </div>
                                            </div>,
                                            ++index % 4 === 0 && <div key={'c' + indice} className="w-100"></div>
                                        ]
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaReserva;