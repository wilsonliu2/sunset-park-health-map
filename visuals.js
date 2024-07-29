document.addEventListener("DOMContentLoaded", function () {
  const data = {
    population: 131654,
    health: {
      goodHealth: 72,
      lifeExpectancy: 84.1,
      bornOutsideUS: 45,
      limitedEnglish: 48,
    },
    ageDistribution: [
      { ageGroup: "0-17", sunsetPark: 22, brooklyn: 0, nyc: 21 },
      { ageGroup: "18-24", sunsetPark: 8, brooklyn: 0, nyc: 8 },
      { ageGroup: "25-44", sunsetPark: 38, brooklyn: 0, nyc: 30 },
      { ageGroup: "45-64", sunsetPark: 21, brooklyn: 0, nyc: 25 },
      { ageGroup: "65+", sunsetPark: 11, brooklyn: 0, nyc: 16 },
    ],
    raceDistribution: [
      { race: "Asian", sunsetPark: 31, brooklyn: 0, nyc: 15 },
      { race: "Black", sunsetPark: 3, brooklyn: 0, nyc: 22 },
      { race: "Latino", sunsetPark: 41, brooklyn: 0, nyc: 29 },
      { race: "White", sunsetPark: 23, brooklyn: 0, nyc: 32 },
      { race: "Other", sunsetPark: 2, brooklyn: 0, nyc: 2 },
    ],
    education: [
      {
        metric: "Elementary Absenteeism",
        sunsetPark: 10,
        brooklyn: 21,
        nyc: 22,
      },
      { metric: "On-Time Graduation", sunsetPark: 81, brooklyn: 81, nyc: 82 },
      { metric: "College Degree", sunsetPark: 34, brooklyn: 0, nyc: 44 },
      {
        metric: "Less than High School",
        sunsetPark: 38,
        brooklyn: 18,
        nyc: 0,
      },
    ],
    healthStatistics: [
      { metric: "Physical Activity", sunsetPark: 67, brooklyn: 0, nyc: 67 },
      { metric: "Fruit/Veggie Intake", sunsetPark: 89, brooklyn: 0, nyc: 89 },
      { metric: "Sugar Drink Intake", sunsetPark: 15, brooklyn: 0, nyc: 0 },
      { metric: "Current Smoking", sunsetPark: 10, brooklyn: 0, nyc: 11 },
      { metric: "Without Insurance", sunsetPark: 14, brooklyn: 0, nyc: 13 },
      { metric: "Without Medical Care", sunsetPark: 7, brooklyn: 0, nyc: 13 },
    ],
    healthOutcomes: [
      { outcome: "Obesity", sunsetPark: 19, brooklyn: 25, nyc: 0 },
      { outcome: "Diabetes", sunsetPark: 10, brooklyn: 12, nyc: 0 },
      { outcome: "Hypertension", sunsetPark: 25, brooklyn: 28, nyc: 0 },
      { outcome: "Binge Drinking", sunsetPark: 22, brooklyn: 17, nyc: 0 },
    ],
  };

  // Function to create grouped bar charts
  function createGroupedBarChart(data, selector, xDomain, xLabel, yLabel) {
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(xDomain).range([0, width]).padding(0.1);

    const x1 = d3
      .scaleBand()
      .domain(["sunsetPark", "brooklyn", "nyc"])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) =>
          d3.max(["sunsetPark", "brooklyn", "nyc"].map((key) => d[key]))
        ),
      ])
      .nice()
      .range([height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(["sunsetPark", "brooklyn", "nyc"])
      .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d[xLabel])},0)`)
      .selectAll("rect")
      .data((d) =>
        ["sunsetPark", "brooklyn", "nyc"].map((key) => ({ key, value: d[key] }))
      )
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "rotate(-15)")
      .style("text-anchor", "end");

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("text-decoration", "underline")
      .text(yLabel);

    const legend = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(["Sunset Park", "Brooklyn", "NYC"])
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text((d) => d);
  }

  // Age Distribution Bar Chart
  createGroupedBarChart(
    data.ageDistribution,
    "#age-distribution-chart",
    data.ageDistribution.map((d) => d.ageGroup),
    "ageGroup",
    "Age Distribution"
  );

  // Race Distribution Bar Chart
  createGroupedBarChart(
    data.raceDistribution,
    "#race-distribution-chart",
    data.raceDistribution.map((d) => d.race),
    "race",
    "Race Distribution"
  );

  // Education Bar Chart
  createGroupedBarChart(
    data.education,
    "#education-chart",
    data.education.map((d) => d.metric),
    "metric",
    "Education Metrics"
  );

  // Health Statistics Bar Chart
  createGroupedBarChart(
    data.healthStatistics,
    "#health-statistics-chart",
    data.healthStatistics.map((d) => d.metric),
    "metric",
    "Health Statistics"
  );

  // Health Outcomes Bar Chart
  createGroupedBarChart(
    data.healthOutcomes,
    "#health-outcomes-chart",
    data.healthOutcomes.map((d) => d.outcome),
    "outcome",
    "Health Outcomes"
  );
});
