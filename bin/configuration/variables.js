const variables = {
    Api: {
        port: process.env.port || 3005
    },

    Database: {
        connection: process.env.connection || 'mongodb://localhost:27017/appFood',
        options: {
            reconnectTries: Number.MAX_VALUE, 
            reconnectInterval: 500, poolSize: 5, 
            useNewUrlParser: true, 
            useUnifiedTopology: true}
    },

    Security: {
        secretKey: 'c58b2fbac125c819ae8e903abc1c8ca3|f4b478a410af5c0e9b6fd76ba40e94c8'
    }
}

module.exports = variables