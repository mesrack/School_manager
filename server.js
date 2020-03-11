const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use('/assets', express.static('public'))
app.set('view-engine', 'ejs')


/********************************************** */
/******************* Roads ******************** */

app.get('/', (req, res) => {
    res.render('./pages/index.ejs')
})

.get('/login', (req, res) => {
    res.render('./pages/login.ejs')
})

.get('/register', (req, res) => {
    res.render('./pages/register.ejs')
})

.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hash(req.body.password, 10)
    } catch (error) {
        
    }
    req.body.email
    req.body.lastname
})

app.listen(8080)