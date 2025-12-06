from flask import Flask
from pymongo import MongoClient
from config import Config
from flask_cors import CORS
import cloudinary

client = None
db = None

def create_app():
    global client, db

    app = Flask(__name__)
    app.config.from_object(Config)

    # -------------------------
    # ENABLE CORS
    # -------------------------
    CORS(app, resources={r"/*": {"origins": "*"}})

    # -------------------------
    # CONNECT MONGODB
    # -------------------------
    client = MongoClient(app.config["MONGO_URI"])
    db = client[app.config["DB_NAME"]]

    print("MongoDB connected successfully!")

    # -------------------------
    # INITIALIZE CLOUDINARY
    # -------------------------
    cloudinary.config(
        cloud_name=app.config["CLOUDINARY_CLOUD_NAME"],
        api_key=app.config["CLOUDINARY_API_KEY"],
        api_secret=app.config["CLOUDINARY_API_SECRET"]
    )

    print("Cloudinary configured successfully!")

    # -------------------------
    # REGISTER ROUTES
    # -------------------------
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
