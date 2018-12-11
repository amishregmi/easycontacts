mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [0, 0],
    zoom: 2
});

var marker = new mapboxgl.Marker({
   // draggable: true
})
	.setLngLat([0, 0])
    .addTo(map);


//For each row in the table.
console.log("WORKING TILL HERE");
var table = document.getElementById('allinfotable');

var rowLength = table.rows.length;

for(var i=0; i<rowLength; i+=1){
  var row = table.rows[i];
  var lat = row.Latitude;
  var lon = row.Longitude;
  console.log("TABLE HERE");
  console.log(lat,lon);
  
}