function showTable(idTable, data) {
    const table = d3.select("#" + idTable);
    table.selectAll("*").remove();

    table.append("tr")
        .selectAll("th")
        .data(Object.keys(data[0]))
        .enter()
        .append("th")
        .text(d => d);

    table.selectAll(".row")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);
}