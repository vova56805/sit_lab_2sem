const createOption = (str, val) => {
    let item = document.createElement("option");
    item.text = str;
    item.value = val;
    return item;
};

const setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = "";
    sortSelect.append(createOption("Нет", 0));

    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
};

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName("select");

    for (const item of allSelect) {
        setSortSelect(head, item);
    }

    document.getElementById("fieldsSecond").disabled = true;
    document.getElementById("fieldsSecondDesc").disabled = true;
    document.getElementById("fieldsFirstDesc").disabled = false;
};

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    const nextCheck = document.getElementById(nextSelectId + "Desc");

    nextSelect.innerHTML = "";
    nextSelect.append(createOption("Нет", 0));

    if (curSelect.value == 0) {
        nextSelect.disabled = true;
        nextCheck.disabled = true;
        nextCheck.checked = false;
        return;
    }

    Array.from(curSelect.options).forEach(option => {
        if (option.value !== "0" && option.value !== curSelect.value) {
            nextSelect.append(createOption(option.text, option.value));
        }
    });

    nextSelect.disabled = false;
    nextCheck.disabled = false;
    nextSelect.value = 0;
    nextCheck.checked = false;
};

document.addEventListener("DOMContentLoaded", function () {
    const filterForm = document.getElementById("filter");
    const sortForm = document.getElementById("sort");

    let currentData = [...films];

    createTable(currentData, "list");
    setSortSelects(films[0], sortForm);

    document.getElementById("fieldsFirst").addEventListener("change", function () {
        changeNextSelect(this, "fieldsSecond");
    });

    document.getElementById("findBtn").addEventListener("click", function () {
        currentData = filterTable(films, "list", filterForm);
        resetSort(sortForm, films[0]);
    });

    document.getElementById("clearFilterBtn").addEventListener("click", function () {
        currentData = clearFilter("list", films, filterForm);
        resetSort(sortForm, films[0]);
    });

    document.getElementById("sortBtn").addEventListener("click", function () {
        sortTable(currentData, "list", sortForm);
    });

    document.getElementById("clearSortBtn").addEventListener("click", function () {
        resetSort(sortForm, films[0]);
        createTable(currentData, "list");
    });
});
