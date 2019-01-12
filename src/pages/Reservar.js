import React, { Component } from 'react'
import api from '../services/api'

class Reservar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nrCartao: '',
            isCartaoUsado: false,
            livroReservado: '',
            isLivroEmUso: false,
            reservaAntiga: {},
            isLoading: false,
            isSuccess: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        // Consulta se o livro está reservado
        this.setState({
            isLoading: true
        })
        await api.get('reservalivro/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    livroReservado: res.data
                })
            })

        let returnLivroReservado = Object.keys(this.state.livroReservado).length

        if (returnLivroReservado === 17) {
            this.setState({
                isLoading: false
            })
        } else {
            this.setState(({
                isLivroEmUso: true,
                isLoading: false
            }))
        }
    }


    // Alterações nos campos do form
    handleInputChange = (e) => {
        this.setState({ nrCartao: e.target.value })
    }

    // Submit form - reservar
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            isCartaoUsado: false,
            isSuccess: false
        })

        // Consulta se o cartão já possui reserva
        await api.get('reserva/' + this.state.nrCartao)
            .then((res) => {
                this.setState({
                    reservaAntiga: res.data
                })
            })

        let qtdeReservas = Object.keys(this.state.reservaAntiga).length

        if (qtdeReservas === 17) {
            await api.post('reserva', {
                idlivro: this.props.match.params.id,
                nrcartao: this.state.nrCartao,
                ativo: true,
                date: new Date().toLocaleString()
            }).then(() => {
                this.setState({
                    isLoading: false,
                    isSuccess: true,
                    nrCartao: ''
                })
            })
        } else {
            this.setState({
                isLoading: false,
                isCartaoUsado: true,
                nrCartao: ''
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <h3>Reservar</h3>
                {this.state.isLoading && <div>Aguarde...</div>}
                {!this.state.isLoading && !this.state.isLivroEmUso && !this.state.isCartaoUsado &&
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Informe o número do seu cartão</label>
                            <input value={this.state.nrCartao} onChange={this.handleInputChange} type="cartao" className="form-control" placeholder="Ex: '123456'" />
                            <small className="form-text text-muted">Após a reserva realizada, você tem um prazo máximo de 48h para a retirada do livro.</small>
                            <button disabled={this.state.isLoading} type="submit" className="btn btn-primary btn-sm">Reservar</button>
                        </div>
                    </form>
                }
                {this.state.isSuccess && <div>Reserva realizada com sucesso.</div>}
                {this.state.isCartaoUsado && <div>Você já possui uma reserva vigente neste momento. Não foi possível fazer sua reserva.</div>}
                {this.state.isLivroEmUso && <div>Livro não disponível no momento.</div>}
            </div>
        )
    }
}

export default Reservar