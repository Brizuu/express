const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let meta = require('./etc/conf');
const tplPomoc = require('./services/tplPomoc');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);
app.set('views', './views');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Velvet2006',
    database: 'zse_tai3'
});

db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych MySQL');
});

app.use(express.static('public'));

hbs.registerPartials(__dirname + '/views/parts', function (err) {
    if (err) console.log('Error registering partials:', err);
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'twojemail@gmail.com',
        pass: 'twojehaslo'
    }
});

app.get('/', (req, res) => {
    res.render('index');
    console.log('Serving index.hbs on homepage');
});

app.get('/users', (req, res) => {
    const query = 'SELECT name, surname, email FROM cmsUsers';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd przy wykonywaniu zapytania:', err);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.render('maile', { users: results });
    });
});

app.post('/maile-selected', (req, res) => {
    const selectedUsers = req.body.selectedUsers;

    if (!selectedUsers) {
        return res.send('<h1>Nie zaznaczono żadnych użytkowników</h1><p><a href="/users">Wróć do listy użytkowników</a></p>');
    }

    const users = Array.isArray(selectedUsers)
        ? selectedUsers.map(user => {
            const [name, surname, email] = user.split(',');
            return { name, surname, email };
        })
        : [{
            name: selectedUsers.split(',')[0],
            surname: selectedUsers.split(',')[1],
            email: selectedUsers.split(',')[2]
        }];

    const emailPromises = users.map(user => {
        const mailOptions = {
            from: 'twojemail@gmail.com',
            to: user.email,
            subject: 'Powiadomienie',
            text: `Witaj ${user.name} ${user.surname},\n\nTo jest mail blogowy wysłany do wybranych maili.`,
            html: `<p>Witaj <strong>${user.name} ${user.surname}</strong>,</p><p>To jest mail blogowy wysłany do wybranych maili.</p>`
        };

        return transporter.sendMail(mailOptions);
    });

    Promise.all(emailPromises)
        .then(() => {
            res.render('maile-selected', { users, message: 'E-maile zostały pomyślnie wysłane' });
        })
        .catch(error => {
            console.error('Błąd podczas wysyłania e-maili:', error);
            res.status(500).send('Wystąpił błąd podczas wysyłania e-maili');
        });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

const router = require('./roots/api');
app.use('/', router);

app.get('/pomoc', tplPomoc);

app.listen(meta.port, () => {
    console.log(`App started, listening on port ${meta.port}`);
});
