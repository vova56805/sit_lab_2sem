function createArrGraph(data, keyX, keyY) {
    const groupObj = d3.group(data, d => String(d[keyX]).split(",")[0]);
    const arr = [];

    for (let item of groupObj) {
        arr.push({
            labelX: item[0],
            value: d3.mean(item[1], d => d[keyY])
        });
    }

    if (keyX === "Год") {
        arr.sort((a, b) => Number(a.labelX) - Number(b.labelX));
    }

    return arr;
}

function drawGraph(data, keyX, keyY, type) {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const arr = createArrGraph(data, keyX, keyY);

    const width = parseFloat(svg.style("width"));
    const height = parseFloat(svg.style("height"));
    const marginX = 60;
    const marginY = 50;

    const scaleX = d3.scaleBand()
        .domain(arr.map(d => d.labelX))
        .range([0, width - 2 * marginX])
        .padding(0.2);

    const scaleY = d3.scaleLinear()
        .domain([0, d3.max(arr, d => d.value) * 1.1])
        .range([height - 2 * marginY, 0]);

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(d3.axisBottom(scaleX))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .call(d3.axisLeft(scaleY));

    if (type === "dot") {
        svg.selectAll("circle")
            .data(arr)
            .enter()
            .append("circle")
            .attr("r", 4)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.value))
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", "red");
    } else {
        svg.selectAll("rect")
            .data(arr)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX))
            .attr("y", d => scaleY(d.value))
            .attr("width", scaleX.bandwidth())
            .attr("height", d => height - 2 * marginY - scaleY(d.value))
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", "red");
    }
}