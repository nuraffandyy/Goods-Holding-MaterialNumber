// =======================================
// Warehouse Material Locator
// app.js
// =======================================

let warehouseData = [];
let filteredData = [];

async function loadData() {

    try {

        const response = await fetch("data.json");

        warehouseData = await response.json();

        filteredData = warehouseData;

        loadStorageType();

    } catch (err) {

        alert("Gagal membaca data.json");

        console.error(err);

    }

}

function loadStorageType() {

    const select = document.getElementById("storageFilter");

    const list = [...new Set(

        warehouseData.map(x => x["Storage Type"])

    )].sort();

    list.forEach(item => {

        const option = document.createElement("option");

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });

}

loadData();
