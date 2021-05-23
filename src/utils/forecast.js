const request=require('request')

const forecast=(latitude,longitude,callback)=>
{
  const url='http://api.weatherstack.com/current?access_key=e5bc8894cf196ac6dafdfd0143d87ba5&query='+latitude+','+longitude
  request({url,json:true},(error,{body}={})=>{
    if(error)
    {
      callback('Unable to connect to weather services!!',undefined)
    }
    else if(body.error)
    {
      callback('Unable to find loaction. Search for another location.',undefined)
    }
    else
    {
      callback(undefined,body.current.weather_descriptions[0] +". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.")
    }
  })
}
module.exports=forecast
