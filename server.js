if(process.env.NODE_ENV !== 'production') {
    console.log("On est en mode dev")
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
var admin = require('./models/administrator')
const flash = require('express-flash')
const session = require('express-session')


const initializePassport = require('./config/passport-config')
initializePassport(passport)

app.set('view-engine', 'ejs')
.use(express.urlencoded({ extended: false }))
.use('/assets', express.static('public'))
.use(flash())
.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())


var tabEmployees = [
    {name: 'Emarre', role: 'Head teacher', classroom: 'CM2 A'},
    {name: 'Misu', role: 'Teacher', classroom: 'CM2 B'},
    {name: 'Dupond', role: 'Teacher', classroom: 'CM1 A'},
    {name: 'Cougnu', role: 'Teacher', classroom: 'CE2 A'},
    {name: 'Boulard', role: 'Substitute', classroom: 'CE2 B'}
];

var typeStreet = [
    {name: 'place', value: 'PL'},
    {name: 'street', value: 'ST'},
    {name: 'boulevard', value: 'BO'},
    {name: 'blind', value: 'BL'},
    {name: 'alley', value: 'AL'},
    {name: 'impasse', value: 'IM'},
];


/********************************************** */
/******************* Roads ******************** */

app.get('/', (req, res) => {
    res.render('./pages/index.ejs', {username : "Loïc"})
})


.get('/login', (req, res) => {
    res.render('./pages/login.ejs')
})

.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

.get('/support', (req, res) => {
    res.render('./pages/support.ejs', {username : "Loïc"})
})


.get('/profile', (req, res) => {
    res.render('./pages/profile.ejs', {username : "Loïc", types : typeStreet })
})

.get('/account_management', (req, res) => {
    res.render('./pages/account_management.ejs', {username : "Loïc", employees: tabEmployees})
})

.get('/profile_edit', (req, res) => {
    // update profile in DB
    // redirect
})


app.listen(8080)