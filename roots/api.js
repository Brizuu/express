const http = require('express')

const rt = http.Router()

rt.get('/', (req, resp) => {
    resp.send('miniApp')
    console.log('homepage')
})

const selfTest = require('../services/selfTest')
rt.get('/selfTest', selfTest)

// const winUser = require('../services/winUser')
// rt.get('/win-user', winUser)

const tplTest = require('../services/tplTest')
rt.get('/tpl-test', tplTest)

const tplHtml = require('../services/tplHtml')
rt.get('/tpl-html', tplHtml)

const tplPomoc = require('../services/tplPomoc')
rt.get('/tpl-pomoc', tplPomoc)

module.exports = rt