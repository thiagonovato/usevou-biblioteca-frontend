import React, { Component } from 'react';
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
        return (
            <div>
                {this.state.isLoading && <h1>Carregando...</h1>}
                {!this.state.isLoading &&
                    <div>
                        {this.state.livros.map(livro => <h1 key={livro.id}>{livro.author}</h1>)}
                    </div>
                }
            </div>
        )
    }
}

export default Livros;