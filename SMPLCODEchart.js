  var chart; // globalize chart variable
  var fruitInfo = [
  {
    type: "column",
    dataPoints: [
      { label: "apple",  y: 10  },
      { label: "orange", y: 15  },
      { label: "banana", y: 25  },
      { label: "mango",  y: 30  },
      { label: "grape",  y: 28  }
    ]
  }
  ];

  function initializeChart() { // object constructor
    var chartProperties = {
  		title: {
  			text: "My First Chart in CanvasJS"
  		},
  		data: [
  		{
  			// Change type to "doughnut", "line", "splineArea", etc.
  			type: "column", // type of chart to render
        dataPoints: fruitInfo
      }
      ]
    };

    chart = new CanvasJS.Chart('chart-container', chartProperties);
  	chart.render(); // draws chart
  }

  window.addEventListener('load', initializeChart);
