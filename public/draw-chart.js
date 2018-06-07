//draw chart using chart.js

var ctx = document.getElementById("chart").getContext('2d');

//grab data from the DOM  - not ideal but will do for small scale stuff like this
var options = document.getElementById("poll-results").getElementsByTagName("li");
var labels = [];
var data = [];

for (var i = 0; i < options.length; i++) {
  labels.push(options[i].innerHTML.split(": ")[0]);
  data.push(options[i].innerHTML.split(": ")[1]);
}

var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Votes',
            data: data,
            backgroundColor: 'rgba(236, 182, 128, 1)',
            borderColor: 'rgba(69, 38, 8, 0.5)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    stepSize: 1 //can't have a fraction of a vote!
                }
            }]
        },
      animation: {
        duration: 0
      },
      legend: {
        display: false
      }
    }
});