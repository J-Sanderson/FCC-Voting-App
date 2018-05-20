const express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

//rudimentary stuff only!
app.get("/polls", function(req, res){
  res.send("This will be a big list of polls");
})

app.get("/user/:id", function(req, res) {
  res.send("This will show polls belonging to " + req.params.id);
})

app.listen(process.env.PORT);
