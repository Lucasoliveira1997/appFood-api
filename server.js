'use strict'

const app = require('../appFood-api/bin/express')
const variables = require('../appFood-api/bin/configuration/variables')

app.listen(variables.Api.port, () => console.log(`server is running on port ${variables.Api.port}`))