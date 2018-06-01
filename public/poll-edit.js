//options for editing a poll

$(document).ready(function() {
  
  $('.deletepoll').click(function(e) {
    
    if(confirm("This will delete your poll! Are you sure you want to do that?")) {
      
      var pollId = $(this).attr("id");
      
      $.ajax({
        type: "DELETE",
        url: "/poll/" + pollId,
        data: pollId,
        dataType: "text",
        success: function(data) {
          window.location.href="/poll";
        },
        error: function(data) {
          //to look at: why does an error occur?
          window.location.href="/poll";
        }
      });
      
    }
    
  });
  
});
