module.exports = function(req, resp){
    resp.render('index', {
        pTitle: 'Strona szablonowa',
        pBody: 'Jestem pan Peepody',
        pIfs: false,
        pTab: [1, 2, 3, 'Start!'],
        pLorem: '<p>Lorem <b>ipsum</b> Ship Dolores</p>',
        pObj: {a:5, b:10, c:15},
    })
}