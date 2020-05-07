/**
 * Server file
 * 
 * @author : Ferrandez Loïc
 * @version : 0.1.0
 * 
 * @description : Create a primary school manager intended for intranet use
 * 
*/

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
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false});


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


// test items
var tabEmployees = [
    {name: 'Emarre', role: 'Head teacher', classroom: 'CM2 A', password: '/vzeq4*4z9*', numTeacher: '48977151654'},
    {name: 'Misu', role: 'Teacher', classroom: 'CM2 B', password: 'G1ChientKimEM', numTeacher: '8798741513'},
    {name: 'Dupond', role: 'Teacher', classroom: 'CM1 A', password: '4qz879rh*', numTeacher: '14848779744'},
    {name: 'Cougnu', role: 'Teacher', classroom: 'CE2 A', password: '64bqes84th64', numTeacher: '115463578'},
    {name: 'Boulard', role: 'Substitute', classroom: 'CE2 B', password: 'v4qzrh687jr', numTeacher: '124878935'}
];

var typeStreet = [
    {name: 'place', value: 'PL'},
    {name: 'street', value: 'ST'},
    {name: 'boulevard', value: 'BO'},
    {name: 'blind', value: 'BL'},
    {name: 'alley', value: 'AL'},
    {name: 'impasse', value: 'IM'},
];

var sessionUser = new Object();
sessionUser.name = "loïc"; 
sessionUser.role = "admin";




/********************************************** */
/******************* Roads ******************** */


app.get('/', (req, res) => {
    res.render('./pages/index.ejs', {sessionUser : sessionUser})
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
    res.render('./pages/support.ejs', {sessionUser : sessionUser})
})


.get('/profile', (req, res) => {
    res.render('./pages/profile.ejs', {sessionUser : sessionUser, types : typeStreet })
})

.get('/account_management', (req, res) => {
    res.render('./pages/account_management.ejs', {sessionUser : sessionUser,
                                                  employees: tabEmployees})
})

.get('/profile_edit', (req, res) => {
    // update profile in DB
    // redirect
})

.post('/account_management/reset-pass', urlencodedParser, (req, res) => {

    for(let i = 0 ; i < tabEmployees.length ; i++) {

        if(tabEmployees[i].numTeacher === req.body.userID) {
            tabEmployees[i].password = req.body.password;
        }
    }

    res.render('./pages/account_management.ejs', {sessionUser : sessionUser,
                                                  employees   : tabEmployees})
})

.post('/account_management/add-user', urlencodedParser, (req, res) => {
    console.log(req.body)
})


app.listen(8080)