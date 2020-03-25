const connection = require('../config/db.js')

class Administrator {

    static create (body, hashedPassword, cb) {
        connection.query('INSERT INTO administrator \
        SET admin_name = ?, \
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


    static getUser(admin_id, email, teacher_nbr) {

        if(id !== null) {

            let user;

            connection.query('SELECT * FROM administrator a \
                              INNER JOIN teacher t \
                                ON a.admin_id = t.admin_id \
                              WHERE admin_id = ' + admin_id + ' \
                              ')
        }
    }


    static deleteUser() {

    }

    
    static searchUser(email) {

    }

}


module.exports = Administrator