module.exports = function(req, resp){
    resp.render('pomoc', {
        pTitle: 'Pomoc',
        pBody: 'Strona Pomocy',
        pIfs: false,
    })
}