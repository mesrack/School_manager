const connection = require('../config/db.js')

class Administrator {

    static create (body, hashedPassword, cb) {
        connection.query('INSERT INTO administrator \
        SET admin_lastname = ?, \
            admin_teachernumber = ?, \
            admin_email = ?, \
            admin_pass = ?' , 
        [
            body.lastname,
            body.teachernumber,
            body.email,
            hashedPassword
        ], (err, res) => {
            if(err) throw err
            cb(res)
        })
    }

}


module.exports = Administrator