from flask import Flask, render_template, request, redirect, flash
from werkzeug.utils import secure_filename
import pandas as pd
import os

app = Flask(_name_)
app.secret_key = "warehouse-secret"

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

data = None


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/admin")
def admin():
    return render_template("admin.html")


@app.route("/upload", methods=["POST"])
def upload():
    global data

    if "excel" not in request.files:
        flash("Pilih file Excel.")
        return redirect("/admin")

    file = request.files["excel"]

    if file.filename == "":
        flash("Tidak ada file dipilih.")
        return redirect("/admin")

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    file.save(filepath)

    data = pd.read_excel(filepath)

    flash(f"Upload berhasil. Total data: {len(data)} baris")

    return redirect("/admin")


if _name_ == "_main_":
    app.run(debug=True)
