const express = require('express')

const app = express()

app.get('/health', async (req, res) => {
    return res.status(200).json({
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    })
})

app.post('/cep/:cep', async (req, res) => {
    

        
    try {
        const res = await axios.get(`https://viacep.com.br/ws/01001000/json/`);
    } catch (error) {
        return res.status(500).json('falha. Serviço não disponível')
    }
    
    return res.json(res.data)
})

app.listen(3001, () => {
    console.log('rondando em 3001')
})