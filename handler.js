const express = require('express')

const app = express()

app.get('/health', async (req, res) => {
    return res.status(200).json({
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    })
})

app.listen(3001, () => {
    console.log('rondando em 3001')
})