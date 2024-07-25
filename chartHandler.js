document.addEventListener("DOMContentLoaded", function () {
  // Filter data by borough
  const filteredData = neighborhoodSummaries.filter(
    (summary) => summary["Neighborhood Charts"] === "Sunset Park"
  );

  function createChart(container, title, series) {
    Highcharts.chart(container, {
      chart: {
        type: "column",
      },
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        allowDecimals: false,
        title: {
          text: "",
        },
      },
      yAxis: {
        title: {
          text: "Percentage (%)",
        },
      },
      tooltip: {
        enabled: true,
        pointFormat: "{series.name}: <b>{point.y:.1f}%</b>",
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            rotation: 270,
            align: "top",
            y: -5,
            crop: true,
            overflow: "none",
            verticalAlign: "top",
            style: {
              color: "black",
              font: "11px Arial, sans-serif",
            },
            pointFormat: "{point.y:.1f}%",
          },
        },
      },
      series: series,
    });
  }

  function showChart(chartId) {
    document.getElementById("chart-behavior").style.display = "none";
    document.getElementById("chart-health").style.display = "none";
    document.getElementById("chart-screening").style.display = "none";
    document.getElementById("chart-status").style.display = "none";

    document.getElementById(chartId).style.display = "block";
  }

  document.getElementById("hc-risk-btn").addEventListener("click", function () {
    showChart("chart-behavior");
    createChart(
      "chart-behavior",
      "Percentage of Unhealthy Behaviors by Neighborhood",
      [
        {
          name: "Uninsured",
          data: filteredData.map((data) => ({
            name: data["Neighborhood Charts"],
            y: data["Lack of health insurance"],
          })),
          color: "#f1ced4",
        },
        {
          name: "Current Smokers",
          data: filteredData.map((data) => ({
            name: data["Neighborhood Charts"],
            y: data["Current smoking"],
          })),
          color: "#808080",
        },
        {
          name: "Binge Drinkers",
          data: filteredData.map((data) => ({
            name: data["Neighborhood Charts"],
            y: data["Binge drinking"],
          })),
          color: "#d8ddb8",
        },
        {
          name: "Obesity",
          data: filteredData.map((data) => ({
            name: data["Neighborhood Charts"],
            y: data["Obesity"],
          })),
          color: "#e0ac8e",
        },
        {
          name: "Physical Inactivity",
          data: filteredData.map((data) => ({
            name: data["Neighborhood Charts"],
            y: data["Physical inactivity"],
          })),
          color: "#6d3d38",
        },
      ]
    );
  });

  document
    .getElementById("hc-outcomes-btn")
    .addEventListener("click", function () {
      showChart("chart-health");
      createChart(
        "chart-health",
        "Percentage of Health Outcomes by Neighborhood",
        [
          {
            name: "Chronic Kidney Disease",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Chronic kidney disease"],
            })),
            color: "#228b22",
          },
          {
            name: "Overall Cancer Prevalence",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Cancer (except skin)"],
            })),
            color: "#b394c1",
          },
          {
            name: "Asthma",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Current asthma"],
            })),
            color: "#c0c0c0",
          },
          {
            name: "Diabetic",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Diabetes"],
            })),
            color: "#db7093",
          },
        ]
      );
    });

  document
    .getElementById("hc-screens-btn")
    .addEventListener("click", function () {
      showChart("chart-screening");
      createChart(
        "chart-screening",
        "Percentage of Health Screenings by Neighborhood",
        [
          {
            name: "Colorectal Cancer Screening",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Colorectal cancer screening"],
            })),
            color: "#00008b",
          },
          {
            name: "Cervical Cancer Screening",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Cervical cancer screening"],
            })),
            color: "#008080",
          },
          {
            name: "Mammography Use",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Mammography use"],
            })),
            color: "#ffc0cb",
          },
          {
            name: "Annual Checkup",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Annual checkup"],
            })),
            color: "#c0dcec",
          },
        ]
      );
    });

  document
    .getElementById("hc-status-btn")
    .addEventListener("click", function () {
      showChart("chart-status");
      createChart(
        "chart-status",
        "Percentage of Health Status by Neighborhood",
        [
          {
            name: "Depression",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Depression"],
            })),
            color: "#00008b",
          },
          {
            name: "Fair or Poor Health",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Fair or poor health"],
            })),
            color: "#008080",
          },
          {
            name: "Disability",
            data: filteredData.map((data) => ({
              name: data["Neighborhood Charts"],
              y: data["Any disability"],
            })),
            color: "#ffc0cb",
          },
        ]
      );
    });

  // Defalt chart
  showChart("chart-behavior");
  createChart(
    "chart-behavior",
    "Percentage of Unhealthy Behaviors by Neighborhood",
    [
      {
        name: "Uninsured",
        data: filteredData.map((data) => ({
          name: data["Neighborhood Charts"],
          y: data["Lack of health insurance"],
        })),
        color: "#f1ced4",
      },
      {
        name: "Current Smokers",
        data: filteredData.map((data) => ({
          name: data["Neighborhood Charts"],
          y: data["Current smoking"],
        })),
        color: "#808080",
      },
      {
        name: "Binge Drinkers",
        data: filteredData.map((data) => ({
          name: data["Neighborhood Charts"],
          y: data["Binge drinking"],
        })),
        color: "#d8ddb8",
      },
      {
        name: "Obesity",
        data: filteredData.map((data) => ({
          name: data["Neighborhood Charts"],
          y: data["Obesity"],
        })),
        color: "#e0ac8e",
      },
      {
        name: "Physical Inactivity",
        data: filteredData.map((data) => ({
          name: data["Neighborhood Charts"],
          y: data["Physical inactivity"],
        })),
        color: "#6d3d38",
      },
    ]
  );
});
