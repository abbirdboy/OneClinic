# load libaries
from flask import Flask, jsonify
from flask_cors import CORS
import sys

# load modules
from .blueprints.blueprint_x import blueprint_x

# init Flask app
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], methods=['GET', 'POST'], allow_headers=['Content-Type'])
# register blueprints. ensure that all paths are versioned!
app.register_blueprint(blueprint_x, url_prefix="/api/v1/")