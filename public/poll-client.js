//for use when creating a poll
//grab poll create data and make a post request
$(document).ready(function() {
  
  $('form').on('submit', function(e) {
    //e.preventDefault();
    
    var item = $('form').serializeArray();
    
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