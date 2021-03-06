from flask import Flask, render_template
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database

app = Flask(__name__)


@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())


@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beers_cheaper_than", methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))


@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_bar_selection(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/bar-cities", methods=["GET"])
def get_bar_cities():
    try:
        return jsonify(database.get_bars_cities())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/item_name", methods=["GET"])
def get_beers():
    try:
        return jsonify(database.get_beers())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/item_name-manufacturer", methods=["GET"])
def get_beer_manufacturers():
    try:
        return jsonify(database.get_beer_manufacturers(None))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/item_name-manufacturer/<beer>", methods=["GET"])
def get_manufacturers_making(beer):
    try:
        return jsonify(database.get_beer_manufacturers(beer))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/likes", methods=["GET"])
def get_likes():
    try:
        drinker = request.args.get("drinker")
        if drinker is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_likes(drinker))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/people", methods=["GET"])
def get_people():
    try:
        return jsonify(database.get_people())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/people/<name>", methods=["GET"])
def find_person(name):
    try:
        return jsonify(database.find_person(first=name));
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/employees", methods=["GET"])
def get_employees():
    try:
        return jsonify(database.get_employees())
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/bars-inventory/<beer>', methods=['GET'])
def find_bars_selling(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.get_bars_inventory(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/num_transactions-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bars_num_frequents())
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    try:
        return jsonify(database.get_transactions())
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/transactions/employees/<name>', methods=['GET'])
def get_transactions_employee(name):
    try:
        return jsonify(database.get_transactions_employee(name))
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/transactions/person/<name>', methods=['GET'])
def get_transactions_people(name):
    try:
        return jsonify(database.get_transactions_person(name))
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/transactions/item', methods=['GET'])
def get_transactions_item(item):
    try:
        return jsonify(database.get_transactions_item(item))
    except Exception as e:
        return make_response(str(e), 500)
