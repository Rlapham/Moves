// BaseMap
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
    var map = L.map('map').setView([40.7296342, -74.0027715], 14.5);
    map.addLayer(layer);

    var walkingLayer = L.geoJson(null, {
    filter: function(feature) {
        //console.log(feature.properties.date); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.properties.activities.activity == 'steps';
        return feature.properties.activities[0].activity == 'walking';
    },
    style: function(feature){
        return{
            color: getColor(feature.properties.activities[0].steps),
            weight: getStroke(feature.properties.activities[0].steps),
            opacity: getOpacity(feature.properties.activities[0].steps)
        }
    }
});

     var stepsLayer = L.geoJson(null, {
    filter: function(feature) {
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        return feature.properties.activities.activity == 'steps';
    },
    style: function(feature){
        return{
            color: "white",
            weight: 1
        }
    },
});


    var transportLayer = L.geoJson(null, {
    filter: function(feature) {
        //console.log(feature.properties.activities[0].activity); 
        // my custom filter function
        return feature.properties.activities[0].activity == 'transport';
    },
    style: function(feature){
        return{
            color: getColor(feature.properties.activities[0].steps),
            weight: getStroke(feature.properties.activities[0].steps),
            opacity: getOpacity(feature.properties.activities[0].steps)
        }
    }
});

    var dateLayer = L.geoJson(null, {
    filter: function(feature) {
        //console.log(feature.properties.date); 
        // my custom filter function
        return feature.properties.date == '20170203'
    },
    style: function(feature){
        return{
            color: "white",
            weight: 1
        }
    },
});

        //places
    var placesLayer = L.geoJson(null, {
        pointToLayer: function(feature, latlng){
        return new L.CircleMarker(latlng, {
            radius: 2,
            color: "white",
            fillOpacity: 1
        })
    },
    onEachFeature(feature, layer){
        //console.log(feature.properties.place.type);
        layer.bindPopup(feature.properties.place.type)
        layer.bindPopup("None of Your Business")
    },
        //filter: function(feature) {
        //console.log(feature.properties.activities[0].activity); 
        // my custom filter function
        //return feature.properties.place.type == "home"
    //}
});

//  var getPlace = filer: function (feature) {
//     var placeQuantity = 0; 
//     for (var b = 0; b < 200; b++){
//         if (properties.place.type = "403944839"){
//             placeQuantity ++; 
//             return placeQuantity;
//         }
// }
// console.log("test"); 
// }  
// getPlace();   

////opacity    
function getOpacity(d) {
    return d > 3000 ? '.3' :
           d > 2000  ? '.5' :
           d > 1500  ? '.6' :
           d > 1000  ? '.8' :
           d > 500   ? '1' :
           d > 250   ? '2' :
           d > 0   ? '3' :
                      '3';
}

////stroke    
function getStroke(d) {
    return d > 3000 ? '8' :
           d > 2000  ? '6' :
           d > 1500  ? '4' :
           d > 1000  ? '2' :
           d > 500   ? '1.5' :
           d > 250   ? '1.2' :
           d > 0   ? '.5' :
                      '.5';
}

////////legend
function getColor(d) {
    return d > 3000 ? '#FF0000' :
           d > 2000  ? '#FF2e00' :
           d > 1500  ? '#FF5900' :
           d > 1000  ? '#FF9d10' :
           d > 500   ? '#FFD200' :
           d > 250   ? '#FFF763' :
           d > 0   ? '#FFFFFF' :
                      '#FFFFFF';
}


var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 250, 500, 1000, 1500, 2000, 3000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



//////////


// var pointA = new L.LatLng(40.7124, -74.0059); 
// var pointB = new L.LatLng(60.6781, -73.9441); 
// var pointList = [pointA, pointB];

// var firstpolyline = new L.Polyline(pointList, {
//     color: 'red', 
//     weight: 3,
//     opacity: .5, 
//     smoothFactor: 1
// }, {snakingSpeed:200}); 
// firstpolyline.addTo(map).snakeIn(); 


//     var route = L.layerGroup([
//     L.marker([ -74.006835, 40.656796 ]),
//     L.polyline([[ -74.006835, 40.656796 ], [ -63.993427, 50.72986 ]]),
//     L.marker([ -63.993427, 50.72986 ])
// ], { snakingPause: 200 });
// route.addTo(map).snakeIn();

    var dataLayer = omnivore.geojson("data/activities.geojson", null, walkingLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/activities.geojson", null, stepsLayer).addTo(map);
    var dataLayer = omnivore.geojson("data/activities.geojson", null, transportLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/activities.geojson", null, dateLayer).addTo(map);
    var dataLayer = omnivore.geojson("data/places.geojson", null, placesLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/places.geojson", null, getPlace).addTo(map);



