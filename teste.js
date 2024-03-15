const express = require('express')
const axios = require('axios')

const app = express()

app.get('/cep/:cep', async (req, res) => {
    
    const cep = req.params.cep


    //verifica se o microsserviço está UP
    try {
        const valida = await axios.get(`http://localhost:3001/health`);

        const statusTest = valida.data.statusCode

        //verifica se todos os serviços estão UP no microsserviço
        if(statusTest != 200){
            return res.status(500).json('falha. Serviço não disponível')
        } 

    } catch (error) {
        return res.status(500).json('falha. Serviço não disponível')
    }
    
    //após validação, estando tudo UP, realiza a chamada do microsserviço
    const consulta = await axios.post(`http://localhost:3001/cep/${cep}`);

    const retorno = consulta.data
    console.log(retorno)

    return res.json(retorno)

})

app.listen(3000, ()=> {
    console.log('rodando em 3000')
})