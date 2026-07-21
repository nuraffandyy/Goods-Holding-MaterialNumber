let materials = [];

fetch("data.json")
.then(response => response.json())
.then(data => {
    materials = data;
});

function searchProduct(){

    let keyword = document.getElementById("search").value.trim().toLowerCase();

    let result = document.getElementById("result");

    result.innerHTML = "";

    if(keyword === ""){
        result.innerHTML = "<div class='not-found'>Masukkan Stock Code terlebih dahulu.</div>";
        return;
    }

    let found = materials.filter(item =>
        String(item.Product).toLowerCase().includes(keyword)
    );

    if(found.length === 0){

        result.innerHTML =
        "<div class='not-found'>Stock Code tidak ditemukan.</div>";

        return;
    }

    found.forEach(item=>{

        result.innerHTML += `

        <div class="card">

            <h2>${item.Product}</h2>

            <div class="label">Description</div>
            <div class="value">${item.Description}</div>

            <div class="label">Storage Bin</div>
            <div class="value">${item.StorageBin}</div>

            <div class="label">Quantity</div>
            <div class="value">${item.Quantity}</div>

            <button
                class="copy-btn"
                onclick="copyBin('${item.StorageBin}')">

                Copy Storage Bin

            </button>

        </div>

        `;

    });

}

function copyBin(bin){

    navigator.clipboard.writeText(bin);

    alert("Storage Bin berhasil disalin : " + bin);

}
