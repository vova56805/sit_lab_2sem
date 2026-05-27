function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);
    const arr = [];

    for (let item of groupObj) {
        arr.push({
            labelX: item[0],
            values: d3.extent(item[1].map(d => d["Высота"]))
        });
    }

    if (key === "Год") {
        arr.sort((a, b) => a.labelX - b.labelX);
    }

    return arr;
}

function drawGraph(data, keyX, valuesY, type) {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const arr = createArrGraph(data, keyX);

    const width = parseFloat(svg.style("width"));
    const height = parseFloat(svg.style("height"));
    const marginX = 50;
    const marginY = 50;

    const nums = arr.flatMap(d => [
        valuesY.includes("min") ? d.values[0] : null,
        valuesY.includes("max") ? d.values[1] : null
    ]).filter(d => d !== null);

    const scaleX = d3.scaleBand()
        .domain(arr.map(d => d.labelX))
        .range([0, width - 2 * marginX])
        .padding(0.2);

    const scaleY = d3.scaleLinear()
        .domain([0, d3.max(nums) * 1.1])
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

    const colors = {
        max: "red",
        min: "blue"
    };

    valuesY.forEach((v, i) => {
        if (type === "dot") {
            svg.selectAll("." + v)
                .data(arr)
                .enter()
                .append("circle")
                .attr("r", 4)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(v === "max" ? d.values[1] : d.values[0]))
                .attr("transform", `translate(${marginX}, ${marginY})`)
                .style("fill", colors[v]);
        } else {
            svg.selectAll("." + v)
                .data(arr)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + i * scaleX.bandwidth() / valuesY.length)
                .attr("y", d => scaleY(v === "max" ? d.values[1] : d.values[0]))
                .attr("width", scaleX.bandwidth() / valuesY.length)
                .attr("height", d => {
                    const val = v === "max" ? d.values[1] : d.values[0];
                    return height - 2 * marginY - scaleY(val);
                })
                .attr("transform", `translate(${marginX}, ${marginY})`)
                .style("fill", colors[v]);
        }
    });
}