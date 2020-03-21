const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const connection = require('./db')


function initialize(passport) {

    // callback of login
    const authenticateUser = async (email, password, done) => {

        
        const hashedPassword = await bcrypt.hash(password, 10)
        connection.query("SELECT * FROM administrator WHERE admin_email = '" + email + "'", (err,rows) => {

			if (err)
                return done(err)
			 if (!rows.length) {
                return done(null, false, { message : 'No user with that email'})
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password === hashedPassword))
                return done(null, false, { message : 'Password incorrect'})
			
            // all is well, return successful user
            return done(null, rows[0]);		
		
		});
    }


    /********************************************** */
    /*************** Local login ****************** */
    /********************************************** */
    passport.use('local-login', new LocalStrategy(
        { usernameField: 'email', 
          passwordField : 'password', 
          passReqToCallBack : true }, authenticateUser))


    // Used to serialize and deserialize the user
    passport.serializeUser((user, done) => done(null, user.id))    
    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM administrator WHERE admin_id = " + id, (err, rows) => {
            done(err, rows[0])
        })
    })
}

module.exports = initialize