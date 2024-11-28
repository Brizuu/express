module.exports = function(req, resp){
    resp.render('main', {
        pTitle: 'Dokument szablonu HTML',
        pBody: 'Jestem pan Pssssadada',
        pIfs: false,
        pTab: [1, 2, 3, 'Jedynka, siadaj!'],
        pLorem: '<p>Lorem <b>ipsum</b> Ship Dolores</p>',
        pObj: {a:5, b:10, c:15},
    })
}