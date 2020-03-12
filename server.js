if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
let admin = require('./models/administrator')
const flash = require('express-flash')
const session = require('express-session')


const initializePassport = require('./config/passport-config')
initializePassport(passport, admin.getUserByEmail(email))

app.set('view-engine', 'ejs')
.use('/assets', express.static('public'))
.use(flash())
.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())



/********************************************** */
/******************* Roads ******************** */

app.get('/', (req, res) => {
    res.render('./pages/index.ejs')
})

.get('/login', passport.authenticate('local'), {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

.post('/login', (req, res) => {
    res.render('./pages/login.ejs')
})


.get('/register', (req, res) => {
    res.render('./pages/register.ejs')
})

.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        admin.create(req.body, hashedPassword, function () {
            // Envoi d'un mail de confirmation
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    req.body.email
    req.body.lastname
})

app.listen(8080)