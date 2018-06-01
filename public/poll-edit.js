//options for editing a poll
/*
$(document).ready(function() {
  
  $('#deletepoll').click(function(e) {
    
    if(confirm("This will delete your poll! Are you sure you want to do that?")) {
      
      var pollId = $(this).attr("id");
      
      $.ajax({
        type: "GET",
        url: "/poll/delete",
        data: pollId,
        success: function() {console.log("Deleting poll request...")}
      });
      
    }
    
  });
  
});
*/