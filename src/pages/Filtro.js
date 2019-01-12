// Importação de libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Importando classes de configurações
import api from '../services/api';

export default class Filtro extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categoria: '',
            livros: [],
            isLoading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.filtraCategoria = this.filtraCategoria.bind(this)
    }

    // Alterações nos campos do form
    handleInputChange = (e) => {
        this.setState({ categoria: e.target.value })

        this.filtraCategoria(e.target.value);

    }

    async filtraCategoria(e) {
        this.setState({
            isLoading: true
        })
        await api
            .get('findbycategoria/' + e)
            .then((res) => {
                const objetos = Object
                    .keys(res.data)
                    .map(key => {
                        return {
                            id: key,
                            ...res.data[key]
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
                    <h3>Filtro</h3>
                    <div className="form-group">
                        <label>Selecione o Gênero/Categoria</label>
                        <select className="form-control" onChange={this.handleInputChange}>
                            <option>-- Selecione --</option>
                            <option value='Autobiografia'>Autobiografia</option>
                            <option value='Autoajuda'>Autoajuda</option>
                            <option value='Ficção'>Ficção</option>
                            <option value='Literatura fantástica'>Literatura fantástica</option>
                            <option value='Não ficção'>Não ficção</option>
                            <option value='Romance'>Romance</option>
                            <option value='Suspense'>Suspense</option>
                        </select>
                    </div>
                    {this.state.isLoading && <div>Aguarde... </div>}
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
        )
    }
}