//options for editing a poll

$(document).ready(function() {
  
  //deletion
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
  
  //voting
  $('.vote').click(function(e) {
    
    var pollId = $(this).attr("id").split("-")[0];
    var votedFor = $(this).attr("id").split("-")[1];
    
    $.ajax({
      type: "POST",
      url: "/poll/" + pollId,
      data: votedFor,
      dataType: "text",
      success: function(data) {
          window.location.href="/poll/" + pollId;
        },
        error: function(data) {
          //to look at: why does an error occur?
          window.location.href="/poll/" + pollId;
        }
    });
    
  });
  
});
