const express = require('express')
const app = express()

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

.post('/register', (req, res) => {

})

app.listen(8080)