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

.get('/register', (req, res) => {
    res.render('./pages/register.ejs')
})


.post('/register', (req, res) => {


    connection.query("SELECT * FROM administrator WHERE admin_email = '" + email + "'", async (err,rows) => {
        console.log(rows)
        console.log("above row object")

        if(err) {
            res.render('./pages/register.ejs', {message : "Search for existing account failed."})
        }
         if (rows.length) {
            res.render('./pages/register.ejs', { message : "Email address already exists."})
        } else {

            // If there is no user with that email
            // Create the user
            const hashedPassword = await bcrypt.hash(password, 10)
        
            let insertQuery = "INSERT INTO administrator ( admin_lastname, admin_email, admin_pass, admin_teachernumber) \
                               VALUES ('" + req.body.name + "', \
                                       '" + req.body.email +"', \
                                       '" + hashedPassword +"', \
                                       '" +  req.body.teachernumber + "')";

            connection.query(insertQuery, (err,rows) => {

                if(err) {
                    res.render('./pages/register', {message : 'Account registration failed.'})
                } else {
                    res.render('./pages/login')
                }
            });	
        }
    })

})

.get('/support', (req, res) => {
    res.render('./pages/support.ejs', {username : "Loïc"})
})


app.listen(8080)