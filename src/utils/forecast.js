const request = require('request')

const forecast = (latitude, longitude, success) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&exclude=current&units=metric&appid=1cc92b35ed3386c46e5f008a0424092d'

    request({url, json: true} , (error, { body }) => {
        if (error){
            success('Unable connect to weather server', undefined)
        }
        else if (body.message){
            success('Unable to find location', undefined)
        }
        else {
            
            success(undefined, "Time Zone " +body.timezone+ ". Temperature " +body.daily[0].temp.day+ ". Weather "+body.daily[0].weather[0].description+ ". Feels Like " +body.hourly[0].feels_like+ ". UVI "+body.hourly[0].uvi+". Visibility "+body.hourly[0].visibility)
            // success(undefined, {
            //     timezone: body.timezone,
            //     icon: "http://openweathermap.org/img/wn/"+body.daily[0].weather[0].icon+".png",
            //     temperature: body.daily[0].temp.day,
            //     weather: body.daily[0].weather[0].description,
                
            // })
            // success(undefined, {
            //     timezone: response.body.timezone,
            //     temperatur: response.body.daily[0].temp.day +' C',
            //     weather: response.body.daily[0].weather[0].description,

            // })
        }
    })
}

module.exports = forecast