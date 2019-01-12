// Importação de libs
import React, { Component } from 'react'

// Importando classes de configurações
import api from '../services/api'

class DetalhesBuscaReserva extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livro: [],
            isLoading: false,
            isSuccess: false
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        })
        // Consultar dados do livro
        await api.get('livro/' + this.props.match.params.id)
            .then((liv) => {
                this.setState({
                    livro: liv.data,
                    isLoading: false
                })
            })
    }


    render() {
        return (
            <div className='container'>
                <h3>Detalhes da reserva</h3>
                {this.state.isLoading && <div>Aguarde...</div>}
                {!this.state.isLoading &&
                    <div className='row'>
                        <div className="m-2 col-sm">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Livro: {this.state.livro.name}</h5>
                                    <p className="card-text">Autor: {this.state.livro.author}</p>
                                    <p className="card-text">Categoria: {this.state.livro.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DetalhesBuscaReserva