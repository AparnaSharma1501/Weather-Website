const request=require('request')
const geoCode = (address, callback)=>
{
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXBhcm5hMTUwMSIsImEiOiJja252eXNodjQwZjViMnBveXpmMXp0cG8xIn0.ehSTZ1l3MdAkX2MlWPg7-w&limit=1&fuzzyMatch=false'
  request({url,json: true},(error,{body}={})=>{
    if(error)
    callback("Unable to connect to network services!!",undefined)
    else if(body.features.length===0)
    callback("Unable to find location. Try another location.",undefined)
    else
    callback(undefined,{
      latitude:body.features[0].center[1],
      longitude:body.features[0].center[0],
      location:body.features[0].place_name
    })
  })
}

module.exports= geoCode
