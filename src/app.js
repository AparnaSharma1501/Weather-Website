const path = require('path')
const request=require('request')
const express = require('express')
const hbs = require('hbs')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setting up static assests
app.use(express.static(path.join(__dirname,'../public')))

//Setting up handle bar engines and views location
app.set('view engine','hbs')
app.set('views',viewPath)

//setting partials
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
  res.render("index",{
    title: 'Weather',
    body:'Showing weather updates for your chosen loaction!!',
    name:'Aparna Sharma'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:"About Us",
    name:'Aparna Sharma'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    body:'A useful page for providing help.',
    name:'Aparna Sharma'
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Aparna Sharma',
    errorMsg:'Help article not found.'
  })
})
//Creating weather endpoint
app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:'No information about address'
    })
  }

  geoCode(req.query.address, (error,{latitude,longitude,location}={})=>{
    if(error)
    return res.send({error})
    forecast(latitude,longitude, (error, forecastData) => {
      if(error)
      return res.send({error})
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Aparna Sharma',
    errorMsg:'Page not found'
  })
})

app.listen(port,()=>{
  console.log('My server is up and running...')
})
