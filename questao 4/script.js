document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("planetTable");
    const headers = table.querySelectorAll("th");
    const nameFilter = document.getElementById("nameFilter");
    const moonFilter = document.getElementById("moonFilter");

    let tableData = Array.from(table.querySelectorAll("tbody tr"));

    headers.forEach(header => {
        header.addEventListener("click", function () {
            const column = header.dataset.column;
            const order = header.dataset.order === "asc" ? "desc" : "asc";
            header.dataset.order = order;
            sortTable(column, order);
        });
    });

    nameFilter.addEventListener("input", filterTable);
    moonFilter.addEventListener("input", filterTable);

    function sortTable(column, order) {
        tableData.sort((a, b) => {
            const aText = a.querySelector(`td:nth-child(${getColumnIndex(column) + 1})`).textContent;
            const bText = b.querySelector(`td:nth-child(${getColumnIndex(column) + 1})`).textContent;
            if (column === "name" || column === "description") {
                return order === "asc" ? aText.localeCompare(bText) : bText.localeCompare(aText);
            } else {
                return order === "asc" ? parseFloat(aText) - parseFloat(bText) : parseFloat(bText) - parseFloat(aText);
            }
        });
        updateTable();
    }

    function filterTable() {
        const nameValue = nameFilter.value.toLowerCase();
        const moonValue = moonFilter.value;
        tableData.forEach(row => {
            const nameText = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
            const moonText = row.querySelector("td:nth-child(4)").textContent;
            const nameMatch = nameText.includes(nameValue);
            const moonMatch = moonValue ? moonText === moonValue : true;
            row.style.display = nameMatch && moonMatch ? "" : "none";
        });
    }

    function getColumnIndex(column) {
        const columns = ["name", "diameter", "distance", "moons", "description"];
        return columns.indexOf(column);
    }

    function updateTable() {
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = "";
        tableData.forEach(row => {
            tbody.appendChild(row);
        });
    }
});
