from flask import Flask, render_template, url_for, request
from util import json_response, validate_user

import data_manager


def get_ip():
    import socket
    return [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1]
                        , [[(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in
                            [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]


app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_manager.select_query(table='boards')


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_manager.select_query(table='cards', clause='WHERE', condition=['boards_id', '=', board_id])


@app.route('/new-board', methods=['POST'])
@json_response
def create_new_board():
    content = {}
    data = request.get_json()
    content['title'] = data
    return data_manager.insert_record(table_name='boards', records=content)


@app.route('/delete-board/<board_id>', methods=['POST'])
@json_response
def delete_board(board_id: int):
    return data_manager.delete_record(table='boards', clause='WHERE', condition=['id', '=', board_id])


@app.route('/delete-card/<card_id>', methods=['POST'])
@json_response
def delete_board(card_id: int):
    return data_manager.delete_record(table='cards', clause='WHERE', condition=['id', '=', card_id])


@app.route("/login", methods=['POST'])
@json_response
def login():
    return validate_user(request.get_json()['login_name'], request.get_json()['login_password'])


def main():
    app.run(debug=True,
            host=get_ip())
    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
