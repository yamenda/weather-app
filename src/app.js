const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
    });
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {long, lat, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forecast(long, lat, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            
            res.send({forecast: forecastData, location, address: req.query.address});
        });

    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
    });
})


app.listen(port, () => {
    console.log("Server is up on port " + port);
})