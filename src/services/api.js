// Importação de libs
import axios from 'axios';

const api = axios.create({
    // Descomentar a linha abaixo para apontar ao backend em máquina local, na porta 3000.
    //baseURL: 'http://localhost:3000'

    // URL hospedada na nuvem
    baseURL: 'https://usevou-biblioteca-backend-odywvuyuzx.now.sh/'
});

export default api;