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
 // console.log("WORKING TILL HERE");
  var table = document.getElementById('allinfotable');

  var rowLength = table.rows.length;
  console.log(rowLength);
  for(var i=1; i<rowLength; i+=1){
    var row = table.rows[i];
    cells = row.cells.length;
    //firstcell
    var firstcell = row.cells[0];
    //console.log("FIRSTCELL", firstcell);
    //console.log("FIRST CELL VAL", firstcell.innerHTML); // WORKING
    var fullname = row.cells[1].innerHTML;
    var lat = row.cells[9].innerHTML;
    var lon  = row.cells[10].innerHTML;
    var address = row.cells[2].innerHTML;

    var displaypopup = fullname+ " "+address;
    var popup = new mapboxgl.Popup({ offset: 25 })
      .setText(displaypopup);
    var marker = new mapboxgl.Marker({
     // draggable: true
    })
      .setLngLat([lon, lat])
      .setPopup(popup)
      .addTo(map);

   // console.log("ENTERING HOVER");


  }

  $("#allinfotable").on("click","tr", function(){
      var name = $(this).data("fullname");
      var lat = $(this).data("latitude");
      var lon = $(this).data("longitude");
      var address = $(this).data("add");

     // console.log("DETAILS CATCHED: ",name,lat,lon);

    // 
   // map.setView(address, 7);
    map.flyTo({
      center:[lon,lat]
    });

  });

  $("#search_input").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
    });
  });
  
});

$("#allinfotable").on("click", "#updatethiscontact", function(){
    
    showUpdate();
    var ids=$(this).data("ids");
    console.log("Id is " + ids);
    var prefix = $(this).data("prefix");
    var firstname = $(this).data("firstname");
    var lastname = $(this).data("lastname");
    var street= $(this).data("street");
    var city= $(this).data("city");
    var state=$(this).data("state");
    var zip = $(this).data("zip");
    var phone = $(this).data("phone");
    var email=$(this).data("email");
    var contactbyphone=$(this).data("contactbyphone");
    var contactbyemail=$(this).data("contactbyemail");
    var contactbymail=$(this).data("contactbymail");
//if state not change = state
//otherwise NJ
  //  console.log(ids, prefix, firstname, lastname, street, city, state, zip, phone, email, contactbyphone, contactbyemail, contactbymail);
//contact_details.push(prefix, firstname,lastname, street, city, state, zip, phone, email, contactbyphone, contactbymail, contactbyemail, latitude, longitude );
   // console.log(fillemail);
    //For updating radiovals:

  //  console.log("CHECKBOX: ", contactbyphone, contactbyemail, contactbymail);
    var $radios = $('input:radio[name=prefix]');
   // if($radios.is(':checked') === false) {
     //   $radios.filter('[value=Male]').prop('checked', true);
    //}
    if (prefix=="Mr."){
      $radios.filter('[value="Mr."]').prop('checked',true);
    }
    else if (prefix=="Mrs."){
      $radios.filter('[value="Mrs."]').prop('checked',true);
    }
    else if (prefix=="Ms."){
      $radios.filter('[value="Ms."]').prop('checked',true);
    }
    else if (prefix=="Dr."){
    $radios.filter('[value="Dr."]').prop('checked',true);
    }

    $('#hideforid').val(ids);
    $('#firstnamei').val(firstname).attr("data-idval",ids);
    $('#lastnamei').val(lastname);
    $('#street').val(street);
    $('#cityi').val(city);
    $('#ZIP').val(zip);
    $('#phonei').val(phone);
    $('#updateemail').val(email);

    $("#selectstate").val(state).attr("selected", "selected");

    if (contactbyphone=="Yes" && contactbyemail=="Yes" && contactbymail== "Yes"){
     // console.log("INSIDE ALL CHECK");
      $("#allchki").prop('checked',true);
    }

    else if (contactbyphone=="Yes"){
    //  console.log("INSIDE PHONE CHECK");
      $("#phonechki").prop('checked',true);
      $("#mailchki").prop('checked',false);
      $("#emailchki").prop('checked',false);
    }
    if (contactbymail=="Yes"){
     // console.log("INSIDE MAIL CHECK");
      $("#mailchki").prop('checked',true);
    }
    if (contactbyemail=="Yes"){
      //console.log("INSIDE EMAIL CHECK");
      $("#emailchki").prop('checked',true);
    }

});




function showUpdate(){
  mask(false,true,false);
};

function mask(start, update, delet){
  start? $('#display_contacts_page').show() : $('#display_contacts_page').hide();
  update? $('#display_update_page').show() : $('#display_update_page').hide();
  //start? $('#display_contacts_page').show() : $('#display_contacts_page').hide();

}

$("#allinfotable").on("click", "#deletethiscontact", function(){
  console.log("INSIDE DELETE CLIENT SIDE FUNCTION");
  var data = {}
  data.deletethisid = $(this).data("thiscontactid");

  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3000/endpoint',
    success: function(data){
      console.log('success');
      console.log(JSON.stringify(data));
      
    }

  });
  $(this).parent().parent().remove();

  //$(this).parent().parent().remove();

  
});