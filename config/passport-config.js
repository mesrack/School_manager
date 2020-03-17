const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const connection = require('./db')


function initialize(passport) {

    // callback of login
    const authenticateUser = async (email, password, done) => {

        console.log(email, ' => ', password);

        /*
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
		
		});*/
    }

    // callback of register
    var registerUser = (lastname, teachernumber, email, password, done) => {

        console.log(lastname)
        console.log("above row lastname************")

        console.log(teachernumber)
        console.log("above row teachernumber************")

        console.log(email)
        console.log("above row email---------------")

        console.log(password)
        console.log("above row pass///////////")

        /*
        // Find a user whose email is the same as the forms email
        // We are checking to see if the user trying to register already exists
        
        connection.query("SELECT * FROM administrator WHERE admin_email = '" + email + "'", async (err,rows) => {
            console.log(rows)
            console.log("above row object")

            if(err) {
                return done(err)
            }
             if (rows.length) {
                return done(null, false, { message : 'That email is already taken.'})
            } else {
    
                // If there is no user with that email
                // Create the user
                var newUserMysql = new Object()
    
                const hashedPassword = await bcrypt.hash(password, 10)
                
                newUserMysql.email    = email
                newUserMysql.password = hashedPassword
            
                let insertQuery = "INSERT INTO administrator ( admin_lastname, admin_email, admin_pass, admin_teachernumber) \
                                   VALUES ('" + req.body.lastname + "', \
                                           '" + req.body.email +"', \
                                           '" + hashedPassword +"', \
                                           '" +  req.body.teachernumber + "')";
    
                console.log(insertQuery)
                connection.query(insertQuery,function(err,rows){
    
                    if(err) {
                        return done(err)
                    } else {

                        newUserMysql.id = rows.insertId
                        
                        return done(null, newUserMysql)
                    }
                });	
            }
        })
        */
        
    }



    /********************************************** */
    /*************** Local login ****************** */
    /********************************************** */
    passport.use('local-login', new LocalStrategy({ usernameField: 'email', passwordField : 'password', passReqToCallBack : true },
    authenticateUser))


    /********************************************** */
    /*************** Local Register *************** */
    /********************************************** */
    passport.use('local-register', new LocalStrategy({ usernameField: 'email', passwordField : 'password', passReqToCallBack : true },
    registerUser))



    // Used to serialize and deserialize the user
    passport.serializeUser((user, done) => done(null, user.id))    
    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM administrator WHERE admin_id = " + id, (err, rows) => {
            done(err, rows[0])
        })
    })
}

module.exports = initialize