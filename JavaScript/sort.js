const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName("select");

    for (const item of sortSelects) {
        const keySort = item.value;

        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + "Desc").checked;

        sortArr.push({
            column: Number(keySort) - 1,
            direction: desc
        });
    }

    return sortArr;
};

const sortTable = (data, idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        createTable(data, idTable);
        return [...data];
    }

    const headers = Object.keys(films[0]);

    const sortedData = [...data].sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const key = headers[column];
            const firstValue = first[key];
            const secondValue = second[key];

            let comparison = 0;

            if (typeof firstValue === "number" && typeof secondValue === "number") {
                comparison = firstValue - secondValue;
            } else {
                comparison = String(firstValue).localeCompare(
                    String(secondValue),
                    "ru",
                    { numeric: true, sensitivity: "base" }
                );
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }

        return 0;
    });

    createTable(sortedData, idTable);
    return sortedData;
};

const resetSort = (sortForm, data) => {
    sortForm.reset();
    setSortSelects(data, sortForm);
};