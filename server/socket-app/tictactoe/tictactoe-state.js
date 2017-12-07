const _ = require('lodash');

module.exports = function (injected) {

    let state = undefined;

    return function (history) {
        function processEvent(event) {
            if(event.type === "GameCreated") {
                state = {
                    board: [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ],
                    fullGame: false,
                    isGameWon: false,
                    turnCounter: 0
                };
            }

            if(event.type === "JoinGame") {
                state.fullGame = true;
            }

            if(event.type === "LeaveGame") {
                state.fullGame = false;
            }

            if(event.type === "PlaceMove") {
                state.board[event.x][event.y] = event.side;
                state.turnCounter++;
            }

            if(event.type === "GameWon") {
                state.isGameWon = true;
            }

        }

        function isTurnX() {
            return state.turnCounter % 2 === 1 ? true : false;
        }

        function isFull() {
            return state.fullGame;
        }

        function isCellEmpty(x, y) {
            return state.board[x][y] === '';
        }

        function isGameWon() {
            return state.isGameWon;
        }

        function isDraw() {
            if(!state.isGameWon && state.turnCounter >= 9) {
                return true;
            }

            return false;
        }

        function checkIfWon(event) {
            let col = 0, row = 0, diag = 0, rdiag = 0;
            let n = 3;

            for(let i = 0; i < n; i++) {
                if(state.board[event.x][i] === event.side) {
                    col++;
                }
                if(state.board[i][event.y] === event.side) {
                    row++;
                }
                if(state.board[i][i] === event.side) {
                    diag++;
                }
                if(state.board[i][n-i+1] === event.side) {
                    rdiag++;
                }
            }

            if(col===n || row===n || diag===n || rdiag===n) {
                return true;
            }

            return false;
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            processEvents: processEvents,
            isTurnX: isTurnX,
            isFull: isFull,
            isCellEmpty: isCellEmpty,
            isGameWon: isGameWon,
            isDraw: isDraw,
            checkIfWon: checkIfWon
        }
    };
};
