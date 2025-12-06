from flask import Blueprint, request, jsonify
from app import db
from app.models.user_model import User
from app.models.login_attempt_model import LoginAttempt
import bcrypt
import cloudinary.uploader


auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    users = db["users"]

    # Check if email exists
    if users.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    # Create user object
    new_user = User(name=name, email=email, password=password)

    # Save to MongoDB
    users.insert_one(new_user.to_dict())

    return jsonify({"message": "Signup successful!"}), 201


# --------------------------
# ✔ SIGN-IN ROUTE
# --------------------------
@auth_bp.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    users = db["users"]

    # Check if user exists
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Check hashed password
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Successful login
    return jsonify({
        "message": "Login successful!",
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }), 200

@auth_bp.route("/log-failed-attempt", methods=["POST"])
def log_failed_attempt():
    data = request.get_json()

    email = data.get("email", "")
    base64_image = data.get("image")  # base64 string or null
    ip = request.remote_addr

    image_url = None

    # ------------------------
    # Upload image to Cloudinary (if provided)
    # ------------------------
    if base64_image:
        try:
            upload = cloudinary.uploader.upload(
                base64_image,
                folder="failed-login-attempts"
            )
            image_url = upload.get("secure_url")
        except Exception as e:
            print("Cloudinary upload error:", e)

    attempts = db["login_attempts"]
    new_attempt = LoginAttempt(email=email, ip=ip, image_url=image_url)

    attempts.insert_one(new_attempt.to_dict())

    return jsonify({"message": "Login attempt logged", "image_url": image_url}), 201