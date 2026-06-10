let currentData = [];

document.addEventListener("DOMContentLoaded", function () {
    currentData = films.slice();

    setSortSelects();
    showTable("list", currentData);
    drawGraph(currentData, "Год", "Рейтинг IMDb", "dot");

    document.getElementById("findBtn").onclick = function () {
        updateTableAndGraph();
    };

    document.getElementById("sortBtn").onclick = function () {
        updateTableAndGraph();
    };

    document.getElementById("drawBtn").onclick = function () {
        updateTableAndGraph();
    };

    document.getElementById("clearFilterBtn").onclick = function () {
        document.getElementById("filter").reset();
        updateTableAndGraph();
    };

    document.getElementById("clearSortBtn").onclick = function () {
        document.getElementById("sort").reset();
        updateTableAndGraph();
    };

    document.getElementById("tableBtn").onclick = function () {
        const table = document.getElementById("list");

        if (this.value === "Скрыть таблицу") {
            table.innerHTML = "";
            this.value = "Показать таблицу";
        } else {
            showTable("list", currentData);
            this.value = "Скрыть таблицу";
        }
    };
});

function updateTableAndGraph() {
    const filterForm = document.getElementById("filter");
    const sortForm = document.getElementById("sort");

    currentData = filterTable(films, "list", filterForm);
    currentData = sortTable(currentData, "list", sortForm);

    const keyX = document.querySelector("input[name='axisX']:checked").value;
    const keyY = document.querySelector("input[name='axisY']:checked").value;
    const type = document.getElementById("chartType").value;

    drawGraph(currentData, keyX, keyY, type);

    document.getElementById("tableBtn").value = "Скрыть таблицу";
}

function setSortSelects() {
    const headers = Object.keys(films[0]);

    const selects = [
        document.getElementById("fieldsFirst"),
        document.getElementById("fieldsSecond")
    ];

    for (const select of selects) {
        select.innerHTML = "";

        const optionEmpty = document.createElement("option");
        optionEmpty.value = "0";
        optionEmpty.textContent = "Нет";
        select.appendChild(optionEmpty);

        headers.forEach((header, index) => {
            const option = document.createElement("option");
            option.value = index + 1;
            option.textContent = header;
            select.appendChild(option);
        });
    }
}

function createTable(data, idTable) {
    showTable(idTable, data);
}