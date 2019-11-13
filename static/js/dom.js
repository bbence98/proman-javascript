// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        dom.loadBoards();
        dom.loadColumnsById('1');
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
        let boardCounter = 0;
        for (let board of boards) {
            boardCounter++;
            boardList += `
                <section class="board" id="board${boardCounter}">
                    <div class="board-header"><span class="board-title">${board.title}</span>
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
            dom.createBoard()
        });
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
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
        </section>
        `;
        let boardContainer = document.querySelector('.board-container');
        boardContainer.insertAdjacentHTML('beforeend', addBoard)
    },
    loadColumnsById: function (boardId) {
        dataHandler.getColumnsById(boardId,function (boards) {
            //boards here is column number, sorry
            let columnContent = '';
            for (let column = 1; column<boards+1; column++) {
                columnContent += `
                        <div class="board-column">
                        <div class="board-column-title">Column ${column}</div>
                        <div class="board-column-content"></div>
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
            element.appendChild(nodeColumnContent)

        });
    }
};
