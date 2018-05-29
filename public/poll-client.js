//grab poll create data and make a post request
$(document).ready(function() {
  
  $('form').on('submit', function() {
    
    var item = $('form input');
    console.log(item);
    
    $.ajax({
      type: "POST",
      url: "/created",
      data: item//,
      //success: function(data) {
        //location.reload();
      //}
    });
    
  });

});