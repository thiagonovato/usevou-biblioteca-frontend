// Importação de libs
import React, { Component } from 'react'

// Importando classes de configurações
import api from '../services/api'

export default class Cartao extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nrCartao: '',
            isLoading: false,
            isLoad: false,
            temReserva: false,
            chaveReserva: '',
            livro: [],
            reserva: [],
            isDevolvendo: false,
            isDevolvido: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.devolverLivro = this.devolverLivro.bind(this)

    }

    // Alterações nos campos do form
    handleInputChange = (e) => {
        this.setState({ nrCartao: e.target.value, isLoad: false })
    }

    // Submit form - Consultar cartão
    handleSubmit = async (e) => {
        let chave = '';
        let chaveReserva = '';

        e.preventDefault();
        this.setState({
            isLoading: true,
            isLoad: false,
            isDevolvendo: false,
            isDevolvido: false
        })

        // Consulta reservas do cartão
        await api.get('reservascartao/' + this.state.nrCartao)
            .then((res) => {
                let qtdeReservas = Object.keys(res.data).length

                if (qtdeReservas === 17) {
                    this.setState({
                        isLoading: false,
                        isLoad: true,
                        temReserva: false
                    })
                } else {
                    Object
                        .keys(res.data)
                        .map(key => {
                            chave = res.data[key].idlivro
                            chaveReserva = key
                            return {
                                id: key,
                                ...res.data[key]
                            }
                        })

                    this.setState({
                        reserva: res.data,
                        chaveReserva: chaveReserva
                    })
                    this.buscarLivro(chave);
                }
            })

    }

    async buscarLivro(chave) {
        await api.get('livro/' + chave)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    livro: res.data,
                    isLoad: true,
                    temReserva: true
                })
            })
    }

    async devolverLivro() {
        this.setState({
            isDevolvendo: true,
            isDevolvido: false
        })
        await api.get('devolvelivro/' + this.state.chaveReserva)
            .then((res) => {
                this.setState({
                    isDevolvendo: false,
                    isDevolvido: true
                })
            })
    }

    render() {
        return (
            <div className='container'>
                <h3>Consulta Cartão</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Veja qual livro você reservou. Informe o número do seu cartão.</label>
                        <input value={this.state.nrCartao} onChange={this.handleInputChange} type="cartao" className="form-control" placeholder="Ex: '123456'" />
                        <button disabled={this.state.isLoading} type="submit" className="btn btn-primary btn-sm">Consultar cartão</button>
                    </div>
                </form>
                {!this.state.isLoading && this.state.isLoad && this.state.temReserva &&
                    <div className='row'>
                        <div className="m-2 col-sm">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Livro: {this.state.livro.name}</h5>
                                    <p className="card-text">Autor: {this.state.livro.author}</p>
                                    <p className="card-text">Categoria: {this.state.livro.category}</p>
                                    <button type="submit" disabled={this.state.isDevolvendo} onClick={this.devolverLivro} className="btn btn-success btn-sm">Confirmar devolução do livro</button>
                                    {this.state.isDevolvendo && <div>Registrando a devolução... aguarde...</div>}
                                    {this.state.isDevolvido && <div>Livro devolvido com sucesso.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {this.state.isLoading && <div>Aguarde... </div>}
                {!this.state.isLoading && this.state.isLoad && !this.state.temReserva &&
                    <div>Nenhuma reserva localizada.</div>
                }
            </div>
        )
    }
}