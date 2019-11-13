// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                <section class="board">
                    <div class="board-header"><span class="board-title">${board.title}</span>
                        <button class="board-delete">Delete Board</button>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </section>
            `;
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>            
        `;

        const createBoardBtn = `
        <div class="new-board-container">
            <button type="button" class="new-board">Add new board</button>
        </div>
        `;

        let mainHeader = document.querySelector('.main-header');
        mainHeader.insertAdjacentHTML("afterend", outerHtml);
        let boardContainer = document.querySelector('.board-container');
        boardContainer.insertAdjacentHTML('beforebegin', createBoardBtn);

        const createBoard = document.querySelector('.new-board');
        createBoard.addEventListener('click', function () {
            dataHandler.createNewBoard();
            dom.createBoard();
            location.reload()
        });
        const deleteBoard = document.querySelectorAll('.board-delete');
        for (let i = 0; i < deleteBoard.length; i++) {
            deleteBoard[i].addEventListener('click', function () {
                dataHandler.getBoards(function (data) {
                    dataHandler.deleteBoard(data[i].id);
                    location.reload()
                });
            });
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    createBoard: function () {
        const addBoard = `
        <section class="board">
            <div class="board-header"><span class="board-title">New Board</span>
                <button class="board-delete">Delete Board</button>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
        </section>
        `;
        let boardContainer = document.querySelector('.board-container');
        boardContainer.insertAdjacentHTML('beforeend', addBoard)
    },
    deleteBoard: function (boardId) {
        console.log(boardId)
    }
};
