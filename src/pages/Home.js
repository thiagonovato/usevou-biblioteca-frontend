// Importando as lib's principais
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Importando classes de configurações
import api from '../services/api';

class Livros extends Component {
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
            .get('livros')
            .then((res) => {
                const objetos = Object
                    .keys(res.data.books)
                    .map(key => {
                        return {
                            id: key,
                            ...res.data.books[key]
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
                    <h3>Catálogo de Livros</h3>
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
                                                        <h5 className="card-title">{livro.name}</h5>
                                                        <p className="card-text">Autor: {livro.author}</p>
                                                        <p className="card-text">Categoria: {livro.category}</p>
                                                        <Link to={'/reserva/' + livro.id} className="btn btn-primary btn-sm">Mais detalhes</Link>
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

export default Livros;