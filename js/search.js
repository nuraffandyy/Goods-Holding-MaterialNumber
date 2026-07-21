// ===================================
// Warehouse Locator v2.0
// search.js
// ===================================

const searchInput = document.getElementById("searchInput");
const resultContainer = document.getElementById("resultContainer");

// Event pencarian
searchInput.addEventListener("input", function () {

    const keyword = this.value.trim().toLowerCase();

    if (keyword === "") {

        resultContainer.innerHTML = `
            <div class="empty-card">
                <h5>Silakan cari Material Number</h5>
            </div>
        `;
        return;
    }

    searchMaterial(keyword);

});

// Cari material
function searchMaterial(keyword){

    const result = warehouseData.filter(item =>

        item["Product"].toLowerCase().includes(keyword) ||

        item["Product Description"].toLowerCase().includes(keyword) ||

        item["Storage Bin"].toLowerCase().includes(keyword)

    );

    showResult(result);

}

// Tampilkan hasil
function showResult(data){

    if(data.length===0){

        resultContainer.innerHTML=`
        <div class="empty-card">

            <h4>Tidak ada data ditemukan</h4>

        </div>`;

        return;

    }

    let html="";

    data.forEach(item=>{

        html+=`

        <div class="result-card">

            <div class="result-header">

                <div>

                    <div class="material-number">

                        ${item["Product"]}

                    </div>

                    <div class="material-desc">

                        ${item["Product Description"]}

                    </div>

                </div>

            </div>

            <div class="info-grid">

                <div class="info-box">

                    <div class="info-title">

                        Storage Type

                    </div>

                    <div class="info-value">

                        ${item["Storage Type"]}

                    </div>

                </div>

                <div class="info-box">

                    <div class="info-title">

                        Storage Bin

                    </div>

                    <div class="info-value">

                        ${item["Storage Bin"]}

                    </div>

                </div>

                <div class="info-box">

                    <div class="info-title">

                        Quantity

                    </div>

                    <div class="info-value">

                        ${item["Quantity"]} ${item["Base Unit of Measure"]}

                    </div>

                </div>

            </div>

            <div class="action-buttons">

                <button

                    class="copy-btn"

                    onclick="copyBin('${item["Storage Bin"]}')">

                    📋 Copy Bin

                </button>

            </div>

        </div>

        `;

    });

    resultContainer.innerHTML=html;

}

// Copy Storage Bin
function copyBin(bin){

    navigator.clipboard.writeText(bin);

    alert("Storage Bin berhasil disalin : " + bin);

}
