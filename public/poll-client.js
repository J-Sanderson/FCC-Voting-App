//grab poll create data and make a post request
$(document).ready(function() {
  
  $('form').on('submit', function(e) {
    //preventDefault();
    
    var item = $('form input').serializeArray();
    //console.log(item);
    
    $.ajax({
      type: "POST",
      url: "/poll/create",
      data: item,
      success: function() {
        console.log("success");
      }
    });
    
  });

});