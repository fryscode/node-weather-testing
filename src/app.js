const path = require('path')
const hbs = require('hbs')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define path for express engine
const partial = path.join(__dirname, '../templates/partial')
const viewqPath = path.join(__dirname, '../templates/views')
// app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static('public'))
const port = process.env.PORT || 3000


console.log(path.join(__dirname, '../templates'))

//Set up handldebars
hbs.registerPartials(partial)
app.set('view engine', 'hbs')
app.set('views', viewqPath)



app.get('/',(req, res) => {
    res.render('home', {
        title: 'Mapbox | OpenMap',
        name: 'Sablon InK'
    })
})


app.get('/a', (req, res) => {
    res.render('a', {
        title: 'Haruka',
        name: 'Graduation'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must be input an address!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
    
   
})



app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must be search in product'
        })
    }
    
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404-notfound')
})
app.listen(port, () => {
    console.log('Listen on port '+ port)
})