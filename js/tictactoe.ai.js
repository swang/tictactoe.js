'use strict';
// @flow

var tictactoe

if (!tictactoe) tictactoe = {}

var count = function(arr: Array<number>, item: PlayerType) {
  var cnt = 0
  for (var c = 0; c < arr.length; c++) {
    if (arr[c] == item) {
      cnt++
    }
  }
  return cnt
}

class AI {
  board: Board;

  constructor() {
    this.board = new Board()
  }

  getBoard(): Board {
    return this.board
  }

  chooseRandom(board: Board, player: PlayerType) {
    var possMoves: Array<number> = board.getFreePositions(),
        result = possMoves[Math.floor(possMoves.length * Math.random())]
    return [player, 1, result]
  }

  alphaBetaSearch(board: Board, player: PlayerType) {
    var biggestValue = -Infinity,
        possMoves: Array<number> = board.getFreePositions(),
        result,
        tryMove,
        abs

    for (var i = 0; i < possMoves.length; i++) {
      var newBoard = new Board(board)

      tryMove = possMoves[i]
      newBoard.put(player, tryMove)

      if (newBoard.winner(player)) {
        return [player, 1000, tryMove]
      }
      if (newBoard.loser(player)) {
        return [player, -1000, tryMove]
      }

      abs = -this.negaMax(newBoard, 4/*ply*/, -Infinity, Infinity, -player)

      if (abs > biggestValue) {
        biggestValue = abs
        result = tryMove
      }

    }
    return [player, biggestValue, result]
  }

  negaMax(board: Board, depth, alpha, beta, player: PlayerType) {

    if (board.endOfGame() || depth === 0 || board.winner(player) || board.loser(player)) {
      return board.utility(player)
    }

    var possMoves = board.getFreePositions(),
        tryMove,
        val

    for (var i = 0; i < possMoves.length; i++) {
      var newBoard = new Board(board)

      tryMove = possMoves[i]
      newBoard.put(player, tryMove)

      val = -this.negaMax(newBoard, depth - 1, -beta, -alpha, -player)

      if (val >= beta) {
        return val
      }

      alpha = Math.max(val, alpha)
    }

    return alpha
  }

}
tictactoe.ai = new AI()
