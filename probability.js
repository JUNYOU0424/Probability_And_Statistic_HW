var theta1, theta2
var n
var d
var probability, probability2 = []
var gaussian, gaussian2 = []
var x_label = []

init()
compute()

document.getElementById("draw").addEventListener("click", function () {
  theta1 = document.getElementById("theta1").value
  theta2 = document.getElementById("theta2").value
  n = document.getElementById("n").value
  d = document.getElementById("d").value
  init()
  compute()
  $('#container').highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'probability'
    },
    xAxis: [{
      categories: x_label
    }],
    yAxis: [{
      labels: {
        style: {
          color: '#3261a8',
          fontSize: '12px'
        }
      },
      title: {
        text: 'theta2',
        style: {
          color: '#3261a8',
          fontSize: '12px'
        }
      }
    }, {
      title: {
        text: 'theta1',
        style: {
          color: '#a83232'
        }
      },
      labels: {
        style: {
          color: '#a83232'
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor: '#FFFFFF'
    },
    series: [{
      name: 'theta1',
      color: '#a83232',
      type: 'column',
      yAxis: 1,
      data: probability,


    }, {
      name: 'theta2',
      color: '#3261a8',
      type: 'column',
      data: probability2,
    }, {
      name: 'theta1(G)',
      color: '#a83632',
      type: 'bellcurve',
      yAxis: 1,
      data: gaussian,


    }, {
      name: 'theta2(G)',
      color: '#3234a8',
      type: 'bellcurve',
      data: gaussian2,
    }]
  });
})



function init() {
  probability = []
  probability2 = []
  gaussian = []
  gaussian2 = []
  x_label = []
  for (var i = 0; i < d; i++) {
    probability[i] = 0
    probability2[i] = 0
    gaussian[i] = 0
    gaussian2[i] = 0
    x_label[i] = i
  }
}

function getRandom(max) {
  return Math.random() * max;
}

function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}


function setData() {
  var count = 0
  var count2 = 0

  var mu1 = d * theta1
  var mu2 = d * theta2
  var sigma1 = Math.sqrt(d * theta1 * (1 - theta1))
  var sigma2 = Math.sqrt(d * theta2 * (1 - theta2))
  var x1 = makeArr(mu1 - 3 * sigma1, mu1 + 3 * sigma1, mu1)
  var x2 = makeArr(mu2 - 3 * sigma2, mu2 + 3 * sigma2, mu2)
  for (var i = 0; i < d; i++) {
    var t = getRandom(1)
    if (t < theta1) {
      count++
    }
    if (t < theta2) {
      count2++
    }
  }
  probability[count] += count
  probability2[count2] += count2

  for (var i = 0; i < d; i++) {
    gaussian[Math.round(x1[i])] = n * (Math.exp(-1 * Math.pow((x1[i] - mu1), 2) / (2 * Math.pow(sigma1, 2))) / Math.sqrt(2 * Math.PI) * sigma1)
  }
  for (var i = 0; i < d; i++) {
    gaussian2[Math.round(x2[i])] = n * (Math.exp(-1 * Math.pow((x2[i] - mu2), 2) / (2 * Math.pow(sigma2, 2))) / Math.sqrt(2 * Math.PI) * sigma2)
  }
}

function compute() {
  for (var i = 0; i < n; i++) {
    setData()
  }
}




