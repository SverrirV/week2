# Server Test for TicTacToe

## Create game command

### Should emit game created event
* Given: Nothing has happened.
* When: TheGuy creates a new game.
* Then: A GameCreated event should be emitted.

## Join game command

### Should emit game joined event
* Given: A game has been created by TheGuy.
* When: Gummi joins the game.
* Then: A GameJoined event should be emitted with user Gummi and side 'O'.

### Should emit FullGameJoinAttempted
* Given: A game has been created by TheGuy and Gummi has already joined.
* When: User Sandri tries to join the game.
* Then: A FullGameJoinAttemped should be emitted Sandri as the user.

## Move command

### Should emit MovePlaced on first game move
* Given: A game has been created by TheGuy and Gummi has already joined.
* When: TheGuy places a move at 0,0.
* Then: A MovePlaced event should be emitted with user TheGuy and 0,0.

### Should emit IllegalMove when square is already occupied
* Given: A game has been created by TheGuy, Gummi has already joined and TheGuy has placed the first move at 0,0.
* When: Gummi tries to place a move at 0,0.
* Then: A IllegalMove event should be emitted with user Gummi.

### Should emit NotYourMove if attempting to make a move out of turn
* Given: A game has been created by TheGuy, Gummi has already joined and TheGuy has placed the first move. 
* When: TheGuy tries to make a move again.
* Then: A NotYourMove event should be emitted with user: TheGuy.

### Should emit GameWon if either player wins
* Given: A game has been created by TheGuy, Gummi has already joined and both users have placed a series of moves resulting in TheGuy having placed 'X' at 0,0 and 0,1.
* When: TheGuy places a move at 0,2.
* Then: A GameWon event should be emitted with TheGuy as user and 'X' as side.

### Should not emit GameDraw if won on last move
* Given: A game has been created by TheGuy, Gummi has already joined and both users have placed a series of moves resulting in only one cell being left open with a winning condition for TheGuy.
* When: TheGuy places a move at the empty cell.
* Then: A GameWon event should be emitted, not a GameDraw event.

### Should emit GameDraw if neither wins
* Given: A game has been created by TheGuy, Gummi has already joined and both users have placed a series of moves resulting in only one cell being left open with no winning condition.
* When: TheGuy places a move at the empty cell.
* Then: A GameDraw event should be emitted.
