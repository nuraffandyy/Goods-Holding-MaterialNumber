let jsonData=[];

document.getElementById("convertBtn").onclick=function(){

const file=document.getElementById("excelFile").files[0];

if(!file){

alert("Pilih file Excel terlebih dahulu");

return;

}

const reader=new FileReader();

reader.onload=function(e){

const data=new Uint8Array(e.target.result);

const workbook=XLSX.read(data,{type:"array"});

const sheet=workbook.Sheets[workbook.SheetNames[0]];

const rows=XLSX.utils.sheet_to_json(sheet);

jsonData=rows;

alert(rows.length+" data berhasil dibaca.");

};

reader.readAsArrayBuffer(file);

}

document.getElementById("downloadBtn").onclick=function(){

if(jsonData.length===0){

alert("Belum ada data.");

return;

}

const blob=new Blob(

[JSON.stringify(jsonData,null,2)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="data.json";

a.click();

}
