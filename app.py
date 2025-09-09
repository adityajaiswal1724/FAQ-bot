from flask import Flask, render_template, jsonify
import json
import os

app= Flask(__name__, static_folder="static",template_folder="templates")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/faq")
def faq():
    with open("faq.json" , "r" , encoding="utf-8") as f:
        return jsonify(json.load(f))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
