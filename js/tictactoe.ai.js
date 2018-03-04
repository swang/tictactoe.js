'use strict';
// @flow

import { Board } from './board.js'

class AI {
  board: Board;

  constructor(board?: Board) {
    this.board = new Board(board)
  }

  getBoard(): Board {
    return this.board
  }

  choose(player: PlayerType) {
  }
}

class RandomAI extends AI {
  choose(player: PlayerType): [PlayerType, number, BoardPos] {
    const board = this.getBoard()
    const possMoves: Array<BoardPos> = board.getFreePositions()
    const result = possMoves[Math.floor(Math.random() * possMoves.length)]
    return [player, 1, result]
  }
}

class AlphaBetaAI extends AI {

  choose(player: PlayerType): [PlayerType, number, BoardPos] {
    let max = -Infinity,
        result: BoardPos = 0,
        board: Board = this.getBoard()

    const possMoves: Array<BoardPos> = board.getFreePositions()

    for (let i = 0; i < possMoves.length; i++) {
      let newBoard: Board = new Board(board)
      let tryMove: BoardPos = possMoves[i]

      newBoard.put(player, tryMove)
      let val = -this.negaMax(newBoard, 4/*ply*/, -Infinity, Infinity, -player)

      if (val > max) {
        max = val
        result = tryMove
      }
    }
    return [player, max, result]
  }

  negaMax(board: Board, depth: number, alpha: number, beta: number, player: PlayerType): number {

    if (board.endOfGame() || depth === 0 || board.isWinner(player) || board.isLoser(player)) {
      return board.getScore(player)
    }

    const possMoves: Array<BoardPos> = board.getFreePositions()

    for (let i = 0; i < possMoves.length; i++) {
      let newBoard: Board = new Board(board)
      let tryMove: BoardPos = possMoves[i]

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
try {
  module.exports.AI = AI
  module.exports.RandomAI = RandomAI
  module.exports.AlphaBetaAI = AlphaBetaAI
} catch (e) {}
