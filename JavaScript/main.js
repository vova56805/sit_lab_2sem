document.addEventListener("DOMContentLoaded", function () {
    showTable("build", buildings);
    drawGraph(buildings, "Страна", ["max"], "dot");

    document.getElementById("tableBtn").onclick = function () {
        const table = document.getElementById("build");

        if (this.textContent === "Скрыть таблицу") {
            table.innerHTML = "";
            this.textContent = "Показать таблицу";
        } else {
            showTable("build", buildings);
            this.textContent = "Скрыть таблицу";
        }
    };

    document.getElementById("drawBtn").onclick = function () {
        const keyX = document.querySelector("input[name='axisX']:checked").value;
        const valuesY = Array.from(document.querySelectorAll("input[name='axisY']:checked"))
            .map(d => d.value);
        const type = document.getElementById("chartType").value;

        if (valuesY.length === 0) {
            alert("Выберите значение по оси OY");
            return;
        }

        drawGraph(buildings, keyX, valuesY, type);
    };
});