const { MongoClient } = require('mongodb');
require('dotenv').config();
let dbConnection

module.exports = {
    connectToDb: (cb) => { //callback function
        
        MongoClient.connect(process.env.DBCREDS)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}