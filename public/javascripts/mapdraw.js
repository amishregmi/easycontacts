$(document).ready(function(){
  
  $("#display_update_page").hide();
  mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pc2g1MDE3IiwiYSI6ImNqcGhubDZlbTB5aWszcW9iMzQ2cjRqazcifQ.ouQSIdcWKt5zV264M6wkPg';
  var coordinates = document.getElementById('coordinates');
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-74, 41],
      zoom: 9
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
    var fullname = row.cells[0].innerHTML;
    var lat = row.cells[7].innerHTML;
    var lon  = row.cells[8].innerHTML;
    var address = row.cells[1].innerHTML;

    var displaypopup = fullname+ " "+address;
    var popup = new mapboxgl.Popup({ offset: 25 })
      .setText(displaypopup);
    var marker = new mapboxgl.Marker({
     // draggable: true
    })
      .setLngLat([lon, lat])
      .setPopup(popup)
      .addTo(map);

    console.log("ENTERING HOVER");


  }

  $("#allinfotable").on("click","tr", function(){
      var name = $(this).data("fullname");
      var lat = $(this).data("latitude");
      var lon = $(this).data("longitude");
      var address = $(this).data("add");

      console.log("DETAILS CATCHED: ",name,lat,lon);

    // 
     // map.setView(address, 7);
      map.flyTo({
        center:[lon,lat]
      });

  });

  
});

$("#allinfotable").on("click", "#updatethiscontact", function(){
    showUpdate();
    
})




function showUpdate(){
  mask(false,true,false);
};

function mask(start, update, delet){
  start? $('#display_contacts_page').show() : $('#display_contacts_page').hide();
  update? $('#display_update_page').show() : $('#display_update_page').hide();
  //start? $('#display_contacts_page').show() : $('#display_contacts_page').hide();

}