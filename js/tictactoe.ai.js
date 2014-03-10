'use strict';

var tictactoe

if (!tictactoe) tictactoe = {}

Array.prototype.count = function(item) {
  var count = 0
  for (var c = 0; c < this.length;c++) {
    if (this[c] == item)
      count++
  }
  return count
}

tictactoe.ai = (function() {

  // board locations are referenced like this:
  // [0,1,2
  //  3,4,5
  //  6,7,8]

  var config = {
    rows: 3,
    cols: 3,
    numToWin: 3,
    ply: 4
  },
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  /*

  function toMove

  determines whose turn it is to move
  input: a tic-tac-toe board
  output: returns 1 for noughts (O) and -1 for crosses (X)

  */

  function toMove() {

    var boardState = (arguments && isBoard(arguments[0]) ? arguments[0] : board),
        players = [0, 0]

    for (var b = 0; b < boardState.length; b++) {
      if (boardState[b] == 1){
        players[0]++
      }
      if (boardState[b] == -1) {
        players[1]++
      }
    }
    if (players[0] <= players[1]) {
      return 1
    }
    return -1
  }

  /*

  function occupy

  places the current player's piece into `location`
  input: a location
  output: returns true if player is able to move there, otherwise false

  */
  function occupy(location) {
    if (getFreePositions().indexOf(location) != -1) {
      board[location] = toMove()
      return true
    }
    return false
  }

  /*

  function clear

  resets the internal board
  input: none
  output: none

  */
  function clear() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  /*

  function isBoard

  basic check to see if input is a tic-tac-toe board
  input: a board
  output: true if input is a board, false if its not

  */
  function isBoard(board) {
    return (board !== undefined && board.length == 9)
  }

  /*

  function getFreePositions

  returns positions available given the tic-tac-toe board, boardState
  input: a tic-tac-toe board (boardState)
  output: an array of open positions

  */
  function getFreePositions() {

    var boardState = arguments[0] ? arguments[0] : board,
        moves = []

    for (var move = 0; move < boardState.length; move++) {
      if (boardState[move] === 0)
        moves.push(move)
    }
    return moves
  }

  /*

  function terminalTest

  returns true if no more moves can be made
  input: boardState (optional, otherwise returns internal board)
  output: true if no more moves can be made

  */
  function terminalTest() {

    var boardState = (arguments && isBoard(arguments[0]) ? arguments[0] : board)
    return getFreePositions(boardState).length === 0
  }

  /*

  function winner

  determines if player is a winner based on board
  input: boardState (optional, otherwise returns internal board), player
  output: true if player has won

  */
  function winner() {

    var boardState = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[0] : board),
        player = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[1] : arguments[0]),
        result = winnerWhere(boardState, player)
    return (result[0] != -1 && result[1] != -1)
  }

  /*

  function loser

  determines if player is a loser based on board
  input: boardState (optional, otherwise returns internal board), player
  output: true if player has lost

  */
  function loser() {
    var boardState = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[0] : board),
        player = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[1] : arguments[0])
    return winner(boardState, -player)
  }

  /*

  function winnerWhere

  returns the location of the start/end of the winning line.
  e.g. a win on the first column for player will return [0, 6],
  a win on the first row for player will return [0, 2]

  input: boardState (optional, otherwise returns internal board), player
  output: 2 element array containing the starting location and ending location of the win
          returns [-1, -1] if not found

  */
  function winnerWhere() {

    var boardState = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[0] : board),
        player = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[1] : arguments[0]),
        diag1,
        diag2,
        row,
        col

    for (var r = 0; r < config.rows ; r++) {
      row = boardState.slice(r*config.rows, (r*config.rows)+config.rows)

      if (row.count(player) == config.numToWin) {
        return [r*config.rows, (r*config.rows)+config.rows-1]
      }
    }
    for (var c = 0; c < config.cols; c++) {
      col = []
      for (var csub = c, iters = 0; csub < boardState.length && iters < config.numToWin; iters++, csub += config.cols) {
        col.push(boardState[csub])
      }
      if (col.count(player) == config.numToWin) {
        return [c, c+(config.cols*(config.numToWin-1)) ]
      }
    }
    /*
      written this way so it can handle any sized tictactoe configuration and how many you need to win
      assuming its just a basic 3x3 box, this will still just run row*col times
    */

    for (var dc1 = 0; dc1 < (config.rows - config.numToWin + 1); dc1++) {
      for (var dr1 = 0; dr1 < (config.cols - config.numToWin + 1); dr1++) {

        diag1 = []
        diag2 = []

        for (var dsub = 0; dsub < config.numToWin; dsub++) {
          diag1.push(boardState[(dr1*config.cols) + (dsub*(config.rows+1))])
          diag2.push(boardState[(dr1*config.cols) + 2 +(dsub*(config.cols-1))])
        }

        if (diag1.count(player) == config.numToWin) {
          return [(dr1*config.cols) + (0*(config.rows+1)), (dr1*config.cols) + ((config.numToWin-1)*(config.rows+1))]
        }
        if (diag2.count(player) == config.numToWin) {
          return [(dr1*config.cols) + 2 +(0*(config.cols-1)), (dr1*config.cols) + 2 +((config.numToWin-1)*(config.cols-1))]
        }
      }
    }
    return [-1, -1]
  }

  /*

  function utility

  returns the value of the current board, boardState for the player
  input: a boardState (optional, otherwise internal board is used, a player
  output: the value of the board

  */
  function utility() {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    var boardState = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[0] : board),
        player = (arguments && arguments.length == 2 && isBoard(arguments[0]) ? arguments[1] : arguments[0]),
        score = 0,
        markScore = [0, 1, 10, 1000],
        diag1 = [boardState[0], boardState[4], boardState[8]],
        diag2 = [boardState[2], boardState[4], boardState[6]],
        row,
        col

    for (var r = 0; r < config.rows ; r++) {

      row = boardState.slice(r * 3, (r * 3) + 3)
      if (row.count(player) > 0 && row.count(-player) === 0)  {
        score += markScore[row.count(player)]
      }
      else if (row.count(-player) > 0 && row.count(player) === 0)  {
        score -= markScore[row.count(-player)]
      }
      col = [boardState[r], boardState[r+3], boardState[r+6]]
      if (col.count(player) > 0 && col.count(-player) === 0) {
        score += markScore[ col.count(player) ]
      }
      else if (col.count(-player) > 0 && col.count(player) === 0) {
        score -= markScore[col.count(-player)]
      }
    }
    if (diag1.count(player) > 0 && diag1.count(-player) === 0) {
      score += markScore[ diag1.count(player) ]
    }
    else if (diag1.count(-player) > 0 && diag1.count(player) === 0) {
      score -= markScore[ diag1.count(-player) ]
    }
    if (diag2.count(player) > 0 && diag2.count(-player) === 0) {
      score += markScore[ diag2.count(player) ]
    }
    else if (diag2.count(-player) > 0 && diag2.count(player) === 0) {
      score -= markScore[ diag2.count(-player) ]
    }
    return score
  }

  /*

  function chooseRandom

  random decision maker for ai, randomly places a piece in an available slot
  input: board, player
  output: returns an array containing 3 things: [player, value of this move, which location to place piece]

  */
  function chooseRandom(state, player) {
    var possMoves = getFreePositions(state),
        result = possMoves[Math.floor(possMoves.length*Math.random())]
    return [player, 1, result]
  }
  /*

  function alphaBetaSearch

  minimax alpha beta pruning decision maker. places a piece where it feels will give it high utility/heuristic values
  input: board, player
  output: returns an array containing 3 things: [player, value of this move, which location to place piece]

  */
  function alphaBetaSearch(state, player) {
    var biggestValue = -Infinity,
        possMoves = getFreePositions(state),
        newBoard = state.slice(0),
        result,
        tryMove,
        abs
    for (var i = 0; i < possMoves.length; i++) {
      tryMove = possMoves[i]
      newBoard[tryMove] = player

      if (winner(newBoard, player))
        return [player, 1000, tryMove]
      if (loser(newBoard, player))
        return [player, -1000, tryMove]
      // abs = minValue(newBoard, config.ply, -Infinity,Infinity, -player, player)
      abs = -negaMax(newBoard, config.ply, -Infinity, Infinity, -player)

      if (abs > biggestValue) {
        biggestValue = abs
        result = tryMove
      }
      newBoard[tryMove] = 0
    }
    return [player, biggestValue, result]
  }
  /*

  function negaMax

  returns the value of the successors to 'state', part of alphaBetaSearch
  input: boardState, current depth, the alpha/beta values, the player currently playing at this state
  output: the value of state's successors based on utility()

  */
  function negaMax(state, depth, alpha, beta, player) {

    if (terminalTest(state) || depth === 0 || winner(state, player) || loser(state, player)) {
      return utility(state, player)
    }
    var possMoves = getFreePositions(state),
        newBoard = state.slice(0),
        tryMove,
        val

    for (var i = 0; i < possMoves.length; i++) {
      tryMove = possMoves[i]

      newBoard[tryMove] = player

      val = -negaMax(newBoard, depth-1, -beta, -alpha, -player)

      if (val >= beta) {
        return val
      }

      alpha = Math.max(val, alpha)

      newBoard[tryMove] = 0
    }
    return alpha
  }

  /*

  function maxValue

  returns the max value the successors to 'state', part of alphaBetaSearch
  input: boardState, current depth, the alpha/beta values, the player currently playing at this depth, the original player we are evaluating for
  output: the maximum value of state's successors based on utility()

  */
  function maxValue(state, depth, alpha, beta, player, firstPlayer) {

    if (terminalTest(state) || depth === 0 || winner(state, firstPlayer) || loser(state, firstPlayer)) {
      return utility(state , firstPlayer )
    }
    var v = -Infinity,
        possMoves = getFreePositions(state),
        newBoard = state.slice(0),
        tryMove,
        minVal

    for (var i = 0; i < possMoves.length; i++) {
      tryMove = possMoves[i]
      newBoard = state.slice(0)
      newBoard[tryMove] = player

      minVal =  minValue(newBoard, depth-1, alpha, beta, -player, firstPlayer)

      v = Math.max(v, minVal)
      if (v >= beta) {
        return v
      }
      alpha = Math.max(v, alpha)
    }
    return v
  }
  /*

  function minValue

  returns the min value the successors to 'state', part of alphaBetaSearch
  input: boardState, current depth, the alpha/beta values, the player currently playing at this depth, the original player we are evaluating for
  output: the minimum value of state's successors based on utility()
  */
  function minValue(state, depth, alpha, beta, player, firstPlayer) {

    if (terminalTest(state) || depth === 0 || winner(state, firstPlayer) || loser(state, firstPlayer)) {
      return utility(state , firstPlayer)
    }
    var v = Infinity,
        possMoves = getFreePositions(state),
        newBoard = state.slice(0),
        tryMove,
        maxVal

    for (var i = 0; i < possMoves.length; i++) {

      tryMove = possMoves[i]
      newBoard = state.slice(0)
      newBoard[tryMove] = player

      maxVal = maxValue(newBoard, depth-1, alpha, beta, -player, firstPlayer)

      v = Math.min(v, maxVal)
      if (v <= alpha) {
        return v
      }
      beta = Math.min(beta, v)
    }
    return v
  }

  return {
    board: function() { return board },
    config: function() { return config },

    toMove: toMove,
    occupy: occupy,
    clear: clear,

    isBoard: isBoard,
    getFreePositions: getFreePositions,
    terminalTest: terminalTest,

    winner: winner,
    loser: loser,
    winnerWhere: winnerWhere,

    utility: utility,
    chooseRandom: chooseRandom,
    alphaBetaSearch: alphaBetaSearch,
    maxValue: maxValue,
    minValue: minValue,
  }
}());
