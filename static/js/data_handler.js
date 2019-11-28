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

    getBoards: async function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback( response);
        });
    },

    getNextBoardId: function (callback) {
        this._api_get('/next-board-id', (response) => {
            this._data = response;
            callback(response);
            return response
        });
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

    createNewBoard: async function (boardTitle='New Board', column_number='4') {
        await post_fetch.fetch_it('/new-board', {'title': boardTitle, 'column_number': column_number})
    },

    createNewCard: function (cardTitle, boardId, statusId) {
        post_fetch.fetch_it('/new-card', {'title': cardTitle, 'boards_id': boardId, 'statuses_id': statusId})
    },

    deleteBoard: async function (boardId) {
        await post_fetch.fetch_it(`/delete-board/${boardId}`, boardId);
    },

    deleteCard: function (cardId) {
        post_fetch.fetch_it(`/delete-card/${cardId}`, cardId);
    },

    getColumnsById: function (boardID, callback) {
        let url = `/get-columns-for-board/${boardID}`;
        this._api_get(url, (response) => {
            this._data = response;
            callback(response);
        });
    },

    renameCard: function (cardId, form_request) {
        post_fetch.fetch_it(`/edit-card/${cardId}`, form_request);
    },

    renameBoard: function (boardId, form_request) {
        post_fetch.fetch_it(`/edit-board/${boardId}`, form_request)
    }

    // here comes more features
};
