async function run() {
    // Get data
    let data = await d3.csv("/data/temperatures.csv");
    console.log(data);

    // Create arrays for dates and temperatures
    let dates = data.map(entry => new Date(entry.timestamp * 1000));
    let temperatures = data.map(entry => parseFloat(entry.temperature));

    // Extract statistics
    let startDate = d3.min(dates);
    let endDate = d3.max(dates);
    let minTemp = d3.min(temperatures);
    let maxTemp = d3.max(temperatures);
    let meanTemp = d3.mean(temperatures);

    // Show statistics
    d3.select(".start-date").text(startDate);
    d3.select(".end-date").text(endDate);
    d3.select(".minimum").text(minTemp);
    d3.select(".maximum").text(maxTemp);
    d3.select(".mean").text(meanTemp);

    // Create graph
    let width = 1000;
    let height = 500;
    let margin = 50;

    // Create x-scale
    let xScale = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, width]);

    // Create y-scale
    let yScale = d3.scaleLinear()
        .domain([50, -50])
        .range([0, height]);

    // Create line function
    let line = d3.line()
        .x(item => xScale(new Date(item.timestamp * 1000)))
        .y(item => yScale(parseFloat(item.temperature)));

    // Create canvas
    let svg = d3.select("#graph")
        .append("svg")
        .attr("width", width + (margin * 2))
        .attr("height", height + (margin * 2))
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    // Draw x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Draw y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    // Draw line
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
}

run();
