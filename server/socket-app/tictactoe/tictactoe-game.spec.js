let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

let createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

let joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

// let winState = {
//     board: [
//         ['X', 'X', ''],
//         ['O', 'O', ''],
//         ['', '', '']
//     ],
//     fullGame: true,
//     isGameWon: false,
//     turnCounter: 3
// };


describe('create game command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
            {
                id:"123987",
                type: "CreateGame",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


fdescribe('join game command', function () {


    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full...', function () {
        given = [createEvent, joinEvent];

        when = {
            type: "JoinGame",
            user: {
                userName: "Sandri"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };

        then = [{
            type: "FullGameJoinAttempted",
            user: {
                userName: "Sandri"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
    });
});

fdescribe('move command', function () {
    let given, when, then;
    
        beforeEach(function () {
            given = undefined;
            when = undefined;
            then = undefined;
        });
    
        afterEach(function () {
            tictactoe(given).executeCommand(when, function (actualEvents) {
                should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
            });
        });

        it('should emit MovePlaced on first game move', function () {
            given = [createEvent, joinEvent];

            when = {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 0
            };

            then = [{
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 0
            }]
        });

        it('should emit IllegalMove when square is already occupied', function () {
            given = [createEvent, joinEvent, {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 0
            }];

            when = {
                type: "PlaceMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'O',
                x: 0,
                y: 0
            }

            then = [{
                type: "IllegalMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }]

        });

        it("should emit NotYourMove if attempting to make move out of turn", function () {
            given = [createEvent, joinEvent, {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 0
            }];

            when = {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 1
            }

            then = [{
                type: "NotYourMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
            }]
        });

        it("Should emit game won on", function () {
            given = [createEvent, joinEvent,
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 0
            },
            {
                type: "PlaceMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'O',
                x: 1,
                y: 0
            },
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 1
            },
            {
                type: "PlaceMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'O',
                x: 2,
                y: 1
            }]

            when = {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X',
                x: 0,
                y: 2
            };

            then = [{
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X'
            }]
        });

        /*it("should not emit GameDraw if won on last move", function () {
            given = [createEvent, joinEvent];

            TictactoeState.board[][]
        });*/

        
});

