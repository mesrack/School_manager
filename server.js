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

const express = require('express')                  // load Express framework
const app = express()                               // Create application
const server = require('http').createServer(app);   // Create server with http module
const bcrypt = require('bcrypt')                    // load module to crypt data
const passport = require('passport')                // load authenficate module
//var admin = require('./models/administrator')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
var io = require('socket.io').listen(server);       // load socket

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
    {name: 'Emarre', role: 'Head teacher', classroom: 'CM2 A', password: '/vzeq4*4z9*', numTeacher: '48977151654', status : 'ok'},
    {name: 'Misu', role: 'Teacher', classroom: 'CM2 B', password: 'G1ChientKimEM', numTeacher: '8798741513', status : 'ok'},
    {name: 'Dupond', role: 'Teacher', classroom: 'CM1 A', password: '4qz879rh*', numTeacher: '14848779744', status : 'ok'},
    {name: 'Cougnu', role: 'Teacher', classroom: 'CE2 A', password: '64bqes84th64', numTeacher: '115463578', status : 'ok'},
    {name: 'Boulard', role: 'Substitute', classroom: 'CE2 B', password: 'v4qzrh687jr', numTeacher: '124878935', status : 'ok'}
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
sessionUser.lastname = "Ferrandez";
sessionUser.phone = "0621548796";
sessionUser.role = "admin";
sessionUser.teachNbr = "54879123547";
sessionUser.email = "loicfer@yahoo.fr";
sessionUser.password = "AZD456-*-d";
sessionUser.streetNbr = "15";
sessionUser.streetType = "ST";
sessionUser.streetName = "des misérables"
sessionUser.postalCode = "81234"
sessionUser.city = "Lyon"




/********************************************** */
/******************* Roads ******************** */


app.get('/', (req, res) => {
})

.get('/home', (req, res) => {
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

.post('/profile/edit', (req, res) => {
    console.log(req.body)
})

.post('/account_management/reset-pass', urlencodedParser, (req, res) => {
    console.log(req.body)
})

.post('/account_management/add-user', urlencodedParser, (req, res) => {
    console.log(req.body)
})


/***************** Roads  *********************/



/***************************************************** */
/********************* SOCKET IO ********************* */
/***************************************************** */

// Manage the data exchange with sockets
/*
io.sockets.on('connect', function(socket) {

    socket.emit('users', tabEmployees);

    socket.on('addTask', function(task) {

        var newTask = ent.encode(task);

        todolist.push(newTask);

        io.emit('newTask', {task: newTask, index: (todolist.length-1)})
    });

    // Delete selected task by index
    socket.on('deleteTask', function(index) {

        todolist.splice(index, 1);

        io.emit('todolist', todolist);
        
    })
})
*/

app.listen(8080)