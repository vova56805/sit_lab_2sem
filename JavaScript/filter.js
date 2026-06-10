const correspond = {
    "Название фильма": "filmTitle",
    "Жанр": "genre",
    "Режиссер": "director",
    "Страна": "country",
    "Год": ["yearFrom", "yearTo"],
    "Рейтинг IMDb": ["ratingFrom", "ratingTo"],
    "Длительность": ["durationFrom", "durationTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        if (!item.id) {
            continue;
        }

        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase().trim();
        }

        if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } else if (item.id.includes("From")) {
                valInput = -Infinity;
            } else if (item.id.includes("To")) {
                valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }

    return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    const tableFilter = data.filter(item => {
        let result = true;

        Object.entries(item).forEach(([key, val]) => {
            if (typeof val === "string") {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
            } else {
                result &&= (
                    val >= datafilter[correspond[key][0]] &&
                    val <= datafilter[correspond[key][1]]
                );
            }
        });

        return result;
    });

    createTable(tableFilter, idTable);
    return tableFilter;
};

const clearFilter = (idTable, data, dataForm) => {
    dataForm.reset();
    createTable(data, idTable);
    return [...data];
};