// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto, Mustache */


var map = L.map('map', {
  center: [15, 10],
  zoom: 2
});

// Popup template
var popupTemplate = document.querySelector('.popup-template').innerHTML;

// This is my previous dark themed basemap: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"

L.tileLayer('https://api.mapbox.com/styles/v1/nicostettler/cju3dbfj11j3t1fo6mpb3s1ti/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibmljb3N0ZXR0bGVyIiwiYSI6ImNqc3lweWFmOTE1cDc0OW9iZGYzbHNyNGoifQ.BgZ8GQky4xAHBlL-Pi8MiQ', {
  maxZoom: 12
}).addTo(map);


// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'vonwildsau'
});


// Initialze source data
var lineSource = new carto.source.SQL('SELECT display_name, quantity, organic, like_banana, describe, cartodb_id, ST_Transform(ST_MakeLine(CDB_LatLng(latitude, longitude), CDB_LatLng(latitude_1, longitude_1)), 3857) AS the_geom_webmercator FROM wheres_my_banana_from');

// Create style for the data
var lineStyle = new carto.style.CartoCSS(`
  #layer {
    line-width: 1.5;
    line-color: #ffcc00;
    line-opacity: 1;
  }

`);


// Add style to the data
var lineLayer = new carto.layer.Layer(lineSource, lineStyle, {
  featureClickColumns: ['display_name', 'quantity', 'organic', 'like_banana', 'describe', 'cartodb_id']
});

// POPUP

lineLayer.on('featureClicked', function (event) {
 // Render the template with all of the data. Mustache ignores ata
  // that isn't used in the template, so this is fine.
  var content =  Mustache.render(popupTemplate, event.data);
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// LAYER 2 *******************************************************************************8


//var pointSource = new carto.source.SQL('banana_copy');

//var pointStyle = new carto.style.CartoCSS(`
//  #layer {
//    marker-width: 30;
//    marker-fill: black;
//    marker-fill-opacity: 1;
// }
// `);

//var pointLayer = new carto.layer.Layer(pointSource, pointStyle);


// Add the data to the map as a layer
client.addLayer(lineLayer);
client.getLeafletLayer().addTo(map);




