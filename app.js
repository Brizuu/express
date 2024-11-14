const express = require('express');
const hbs = require('hbs');
let meta = require('./etc/conf'); // Ensure this file contains `port` configuration
const tplPomoc = require('./services/tplPomoc');

const app = express();

// Set up Handlebars as the view engine for `.hbs` and `.html` files
app.set('view engine', 'hbs');
app.engine('html', hbs.__express); // Optional for `.html` usage with Handlebars
app.set('views', './views'); // Views directory for Handlebars templates

app.use(express.static('public')); // Serves static files from the 'public' folder

// Register partials, if you have any
hbs.registerPartials(__dirname + '/views/parts', function (err) {
    if (err) console.log('Error registering partials:', err);
});

// Serve static files from the root directory (for CSS, images, etc.)
app.use(express.static(__dirname));

// Route for homepage
app.get('/', (req, res) => {
    res.render('index'); // Render `index.hbs` as the main page
    console.log('Serving index.hbs on homepage');
});

// Mount the API router
const router = require('./roots/api');
app.use('/', router);

// Route for `pomoc` page
app.get('/pomoc', tplPomoc); // Use the `tplPomoc` function to render `pomoc.hbs`

// Start the server
app.listen(meta.port, () => {
    console.log(`App started, listening on port ${meta.port}`);
});
