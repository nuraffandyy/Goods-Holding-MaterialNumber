// ====================================
// Warehouse Locator v2.0
// app.js Part 1
// ====================================

let warehouseData = [];

// Load data.json
async function loadData() {

    try {

        const response = await fetch("data.json");

        warehouseData = await response.json();

        updateDashboard();

    } catch (error) {

        console.error("Gagal membaca data.json", error);

    }

}

// Dashboard
function updateDashboard() {

    document.getElementById("totalMaterial").innerText =
        warehouseData.length.toLocaleString();

    const bins = new Set();

    warehouseData.forEach(item => {

        bins.add(item["Storage Bin"]);

    });

    document.getElementById("totalBin").innerText =
        bins.size.toLocaleString();

    document.getElementById("lastUpdate").innerText =
        new Date().toLocaleDateString("id-ID");

}

// Dark Mode

const darkButton = document.getElementById("darkModeBtn");

darkButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkmode",
        document.body.classList.contains("dark-mode")
    );

});

// Load Dark Mode

if(localStorage.getItem("darkmode") === "true"){

    document.body.classList.add("dark-mode");

}

// Jalankan aplikasi

loadData();
