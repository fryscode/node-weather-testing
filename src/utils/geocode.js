const request = require('request')

const geocode = (address, success) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWhuYiIsImEiOiJja3J3dWhxODIwMnJhMndvOWw0a2Y3Z3p1In0.0MwynKPFWdhu3N9yBSVocg'
    //encodeURIComponent(address)

    request({url, json: true}, (error, { body }) => {
        if (error){
            success('Unable to connect to location server!', undefined)
        }
        else if (body.features.length === 0 ){
            success('Unable to find location', undefined)
        }
        else {
            success(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                // about: body.attribution
            })
        }
    })
}

module.exports = geocode