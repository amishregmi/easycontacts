mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74, 41],
    zoom: 2
});



//For each row in the table.
console.log("WORKING TILL HERE");
var table = document.getElementById('allinfotable');

var rowLength = table.rows.length;
console.log(rowLength);
for(var i=1; i<rowLength; i+=1){
  var row = table.rows[i];
  cells = row.cells.length;
  //firstcell
  var firstcell = row.cells[0];
  console.log("FIRSTCELL", firstcell);
  console.log("FIRST CELL VAL", firstcell.innerHTML); // WORKING
  
  var lat = row.cells[7].innerHTML;
  var lon  = row.cells[8].innerHTML;
  var marker = new mapboxgl.Marker({
   // draggable: true
  })
    .setLngLat([lon, lat])
    .addTo(map);
}

$("#allinfotable").on("click","tr", function(){
    var name = $(this).data("fullname");
    var lat = $(this).data("latitude");
    var lon = $(this).data("longitude");

    console.log("DETAILS CATCHED: ",name,lat,lon);

    map.flyTo({
      center:[lon,lat]
    });


  });