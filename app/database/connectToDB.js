const sqlClient = require('./sequelizeClient');


async function connectToDB() {
    try {
        await sqlClient.authenticate()
        console.log('✅ Connection to DB succeeded')
    } catch(err){
        console.log('❌ Failed to connect to DB')
    }
}

module.exports = connectToDB
