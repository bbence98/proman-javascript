import {post_fetch} from "./post_fetch.js";

// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)

export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },

    init: function () {
    },

    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },

    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
        this._api_get('/')
    },

    getStatuses: function (callback) {
        this._api_get('/get-statuses', (response) => {
            this._data = response;
            callback(response);
        });
    },

    getStatus: function (statusId, callback) {

    },

    getCardsByBoardId: function (boardId, callback) {
        let url = `/get-cards-by-board-id/${boardId}`;
        this._api_get(url, (response) => {
            this._data = response;
            callback(response);
        })
    },

    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },

    createNewBoard: function (boardTitle='New Board', column_number=4) {
        post_fetch.fetch_it('/new-board', boardTitle, column_number)
    },

    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },

    deleteBoard: function (boardId) {
        post_fetch.fetch_it(`/delete-board/${boardId}`, boardId)
    },

    deleteCard: function (cardId) {
        post_fetch.fetch_it(`/delete-card/${cardId}`, cardId)
    },

    getColumnsById: function (boardID, callback) {
    let url = `/get-columns-for-board/${boardID}`;
    this._api_get(url, (response) => {
        this._data = response;
        callback(response);
    });
    }

    // here comes more features
};
