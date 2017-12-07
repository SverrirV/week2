
module.exports = function(injected){
    let TictactoeState = injected('TictactoeState');

    return function(history){

        let gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){
                function applyEvents(events, moreEvents){
                    gameState.processEvents(events);

                    // Check here for game state that may result in additional events
                    eventHandler(events);
                }

                let cmdHandlers = {
                    "CreateGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.isFull()){
                            applyEvents( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "LeaveGame": function (cmd) {
                        applyEvents([{
                            gameId: cmd.gameId,
                            type: "GameLeft",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        // When a player attempts to make a move out of turn.
                        if((gameState.isTurnX() && cmd.side === 'X')
                        || (!gameState.isTurnX() && cmd.side === 'O')) {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "NotYourMove",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }]);

                            return;
                        }

                        // When a player attempts to move to a square that is already occupied.
                        if(!gameState.isCellEmpty(cmd.x, cmd.y)) {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "IllegalMove",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }]);

                            return;
                        }

                        // Move is legal.
                       if(!gameState.checkIfWon(cmd)){
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "MovePlaced",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side,
                                x: cmd.x,
                                y: cmd.y
                            }]);
                        }    
                        else {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side
                            }]);
                        }

                        if(gameState.isDraw()) {
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "GameDraw",
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }]);
                        }

                    },
                    "GameWon": function(cmd){
                        // Check if game has been won
                            applyEvents([{
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                            }]);
                            return;
                    },

                    "RequestGameHistory": function(cmd){
                        // Game does not handle this query command, is declared here for making tests more robust.
                    }
                };
                console.log("......................................" + cmd.type);
                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};

