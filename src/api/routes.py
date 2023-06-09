"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password_hash = request.json.get("password_hash")
    user = User.query.filter_by(email = body_email, password_hash = body_password_hash).first()
    if not user:
        return jsonify ({"Error": "X"}), 401
    token= create_access_token(identity=user.id)

    return jsonify({"response": "Hola", "token": token}), 200


@api.route('/register', methods=['POST'])
def user_register():
    body_email = request.json.get("email")
    body_password_hash = request.json.get("password_hash")
    user_already_exist = User.query.filter_by(email = body_email).first()
    if user_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_user = User(email= body_email, password_hash = body_password_hash)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User register sucessfully"}), 200
   

@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response": "Hola", "email": user.email, "password": user.password_hash}), 200
