'use strict';
// @flow

class AI {
  board: Board;

  constructor() {
    this.board = new Board()
  }

  getBoard(): Board {
    return this.board
  }

  chooseRandom(board: Board, player: PlayerType): [PlayerType, number, number, void] {
    const possMoves: Array<number> = board.getFreePositions(),
        result = possMoves[Math.floor(possMoves.length * Math.random())]
    return [player, 1, result]
  }

  alphaBetaSearch(board: Board, player: PlayerType): [PlayerType, number, number, void] {
    let biggestValue = -Infinity,
        result = biggestValue

    const possMoves: Array<number> = board.getFreePositions()

    for (var i = 0; i < possMoves.length; i++) {
      let newBoard = new Board(board)
      let tryMove = possMoves[i]

      newBoard.put(player, tryMove)

      if (newBoard.winner(player)) {
        return [player, 1000, tryMove]
      }
      if (newBoard.loser(player)) {
        return [player, -1000, tryMove]
      }

      let abs = -this.negaMax(newBoard, 4/*ply*/, -Infinity, Infinity, -player)

      if (abs > biggestValue) {
        biggestValue = abs
        result = tryMove
      }

    }
    return [player, biggestValue, result]
  }

  negaMax(board: Board, depth: number, alpha: number, beta: number, player: PlayerType): number {

    if (board.endOfGame() || depth === 0 || board.winner(player) || board.loser(player)) {
      return board.utility(player)
    }

    const possMoves = board.getFreePositions()

    for (let i = 0; i < possMoves.length; i++) {
      let newBoard = new Board(board)
      let tryMove = possMoves[i]

      newBoard.put(player, tryMove)

      let val = -this.negaMax(newBoard, depth - 1, -beta, -alpha, -player)

      if (val >= beta) {
        return val
      }

      alpha = Math.max(val, alpha)
    }

    return alpha
  }

}