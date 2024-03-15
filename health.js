const express = require('express')
const axios = require('axios')

const app = express()

app.get('/health', async (req, res) => {

    //define statusCode como 200 por padrão
    let status = 200

    //corpo do response do health
    const validation = {
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now(),
        //retorno após teste de conectividade com o BD
        database: false
    }

    //altera o statusCode para 400 caso não conecte ao BD
    //poderia incluir mais validações de outros serviços
    if(validation.database === false) {
        status = 400
    }

    //response do endpoint
    return res.status(status).json({
        validation,
        statusCode: status
    })
})

app.post('/cep/:cep', async (req, res) => {
    
    
    try {

        const cep = req.params.cep
        const consulta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const retorno = consulta.data
        console.log(retorno)
    
        return res.json(retorno)


    } catch (error) {
        return res.status(500).json('falha. Serviço não disponível')
    }

   
})

app.listen(3001, () => {
    console.log('rondando em 3001')
})