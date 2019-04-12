/* global L, carto */

if (location.protocol != 'https:') {
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

var formMap = L.map('formMap', {
  center: [30, -30],
  zoom: 2
});

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/nicostettler/cju3dbfj11j3t1fo6mpb3s1ti/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibmljb3N0ZXR0bGVyIiwiYSI6ImNqc3lweWFmOTE1cDc0OW9iZGYzbHNyNGoifQ.BgZ8GQky4xAHBlL-Pi8MiQ', {
  maxZoom: 18
}).addTo(formMap);

          if (confirm("For this Map to work properly we need to know your location. \nPlease click 'Allow' on the following pop-up.")) {}
          else {
            location.href = 'index.html';
          }


// Adding Geolocation

var latitude_1 = document.querySelector('.latitude_1');
var longitude_1 = document.querySelector('.longitude_1');

var id, options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);

function success(pos) {
  var crd = pos.coords;

  console.log(`Latitude: ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  
  latitude_1.value = crd.latitude;
  longitude_1.value = crd.longitude;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  //location.href = "index.html";
  
}

navigator.geolocation.getCurrentPosition(success, error, options);


// Add event listener to the map that updates the latitude and longitude on the form


var latitude = document.querySelector('.latitude');
var longitude = document.querySelector('.longitude');

var markerLayer = L.featureGroup().addTo(formMap);

formMap.on('click', function (event) {
  // Clear the existing marker
  markerLayer.clearLayers();
  
  // Log out the latlng so we can see that it's correct
  console.log(event.latlng);
  document.querySelector('.submit-button').removeAttribute('disabled')
  
  // Add a marker to the map
  var marker = L.marker(event.latlng);
  markerLayer.addLayer(marker);
  
  // Update the form fields
  latitude.value = event.latlng.lat;
  longitude.value = event.latlng.lng;
});
