// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        dom.loadBoards();
        window.onload = dom.deleteCard;
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            for (let board of boards) {
                dom.loadColumnsById(board.id, () => {
                    dom.loadCards(board.id);
                });
            }
        });
    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';
        let boardCounter = 0;
        for (let board of boards) {
            boardCounter++;
            boardList += `
                <section class="board" id="board${board.id}">
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
        <div class="add-new-board">
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
                    deleteBoard[i].parentElement.parentElement.remove();
                });
            });
        }
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards, boardId);
        });
    },

    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let currentBoardSelector = `#board${boardId}`;
        let currentBoard = document.querySelector(currentBoardSelector);
        for (let card of cards) {
            let cardHtml = `
                            <div class="card" id="${card.id}">
                            <div class="card-remove">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                            <div class="card-title">${card.title}</div>
                            </div>
                          `
            let columnSelector = `#column${card.statuses_id}`;
            let currentColumn = currentBoard.querySelector(columnSelector);
            let nodeCard = document.createRange().createContextualFragment(cardHtml);
            currentColumn.appendChild(nodeCard);
        }
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

    loadColumnsById: function (boardId, callback) {
        dataHandler.getColumnsById(boardId, function (boards) {
            //boards here is column number, sorry
            let columnContent = '';
            for (let column = 1; column < boards + 1; column++) {
                columnContent += `
                        <div class="board-column">
                        <div class="board-column-title">Column ${column}</div>
                        <div class="board-column-content" id="column${column - 1}"></div>
                        </div>`;
            }
            let outerColumnContent = `
                       <div class="board-columns">
                       ${columnContent}
                       </div>
            `;

            let domToAppend = `#board${boardId}`;
            let element = document.querySelector(domToAppend);
            let nodeColumnContent = document.createRange().createContextualFragment(outerColumnContent);
            element.appendChild(nodeColumnContent);

            callback();
        });
    },
    deleteCard: function () {
        const del_cards = document.querySelectorAll('.card-remove');
        for (let i = 0; i < del_cards.length; i++) {
            del_cards[i].addEventListener('click', function () {
                dataHandler.deleteCard(del_cards[i].parentElement.id);
                del_cards[i].parentElement.remove();
            });
        }
    },

};
