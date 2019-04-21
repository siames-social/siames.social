// used inside src/views/examples/LandingPage.jsx
const bigChart = {
  data: canvas => {
    let ctx = canvas.getContext("2d");

    let gradientFill = ctx.createLinearGradient(0, 230, 0, 50);

    gradientFill.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientFill.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientFill.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "SEP 2018",
        "OCT 2018",
        "NOV 2018",
        "DEC 2018",
        "ENE 2019",
        "FEB 2019",
        "MAR 2019",
        "APR 2019",
        "MAY 2019",
        "JUN 2019",
        "JUL 2019",
        "AUG 2019",
        "SEP 2019",
        "OCT 2019",
        "NOV 2019",
        "DEC 2019",
      ],
      datasets: [
        {
          labels: [
            "Begining the project",
            "Documentation and research",
            "Documentation and research",
            "Documentation and research",
            "Documentation and research",
            "Documentation and research",
            "Development",
            "Development",
            "Write report",
            "Open beta access",
            "Get feedbakc and improve",
            "Get feedbakc and improve",
            "Work on dashboard",
            "Work on dashboard",
            "Work on dashboard",
            "Launch beta dashboard access",
          ],
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#1d8cf8",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1d8cf8",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#5464ed",
          //pointHoverBorderColor:'rgba(35,46,55,1)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [10, 20, 30,40, 50, 60, 100, 140, 180, 250, 260, 270, 290, 310, 330, 350, 400]
        }
      ]
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: "#fff",
      titleFontColor: "#ccc",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      callbacks: {
        label: function (item, data) {
          console.log(item)
          var label = data.datasets[item.datasetIndex].labels[item.index]
          return label;
        }
      },
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,0,0,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 350,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,0,0,0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  }
};

export default bigChart;
