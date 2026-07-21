from flask import Flask, render_template, request, redirect, flash, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import os

app = Flask(_name_)
app.secret_key = "warehouse-secret-key"

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Menyimpan data Excel di memori
data = None


# =========================
# HALAMAN USER
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# HALAMAN ADMIN
# =========================
@app.route("/admin")
def admin():
    return render_template("admin.html")


# =========================
# UPLOAD EXCEL
# =========================
@app.route("/upload", methods=["POST"])
def upload():
    global data

    if "excel" not in request.files:
        flash("Silakan pilih file Excel.")
        return redirect("/admin")

    file = request.files["excel"]

    if file.filename == "":
        flash("Tidak ada file yang dipilih.")
        return redirect("/admin")

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    file.save(filepath)

    try:
        data = pd.read_excel(filepath)
        flash(f"Upload berhasil. Total data : {len(data)} baris")
    except Exception as e:
        flash(f"Gagal membaca Excel : {e}")

    return redirect("/admin")


# =========================
# SEARCH STOCK CODE
# =========================
@app.route("/search")
def search():

    global data

    if data is None:
        return jsonify([])

    product = request.args.get("product", "").strip()

    if product == "":
        return jsonify([])

    result = data[
        data["Product"].astype(str).str.contains(
            product,
            case=False,
            na=False
        )
    ]

    return jsonify(result.to_dict(orient="records"))


# =========================
# START APP
# =========================
if _name_ == "_main_":
    app.run(debug=True)
