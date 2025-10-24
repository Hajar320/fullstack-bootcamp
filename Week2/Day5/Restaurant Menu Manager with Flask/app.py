"""
Flask crud backend
"""

from flask import Flask, jsonify, redirect
from routes import menu_items_bp

app = Flask(__name__)
app.secret_key = 'SECRET_KEY'


app.register_blueprint(menu_items_bp, url_prefix="/")


@app.errorhandler(404)
def not_found(e):
    """ Handle 404 errors """
    return jsonify({"error": "Not found", "message": str(e)}), 404


@app.errorhandler(Exception)
def handle_exception(e):
    """ Handle Exception errors """
    return jsonify({"error": "An error occurred", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
