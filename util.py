from functools import wraps
from flask import jsonify
import data_manager
import hash


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function


def user_in_db(name):
    user = data_manager.select_query(table='users', clause='WHERE', condition=['name', '=', name])
    if user:
        return True
    return False


def validate_user(name, password):
    user_name = data_manager.select_query(
        table='users', column='password', clause='WHERE', condition=['name', '=', name])
    try:
        return {"name": name, "password_legit": hash.verify_password(password, user_name[0]['password'])}
    except IndexError:
        return False


