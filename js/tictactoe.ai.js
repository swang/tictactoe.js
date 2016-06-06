'use strict';
//@flow

var tictactoe

if (!tictactoe) tictactoe = {}

var count = function(arr: Array<any>, item: any) {
  var cnt = 0

  for (var c = 0; c < arr.length; c++) {
    if (arr[c] == item) {
      cnt++
    }
  }
  return cnt
}

class AI {
  config: Object;
  board: Board;

  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  toMove(boardState?: Board): Player {
    if (!boardState) { boardState = this.board }

    var players = [0, 0]

    for (var b = 0; b < boardState.length; b++) {
      if (boardState[b] === 1) {
        players[0]++
      }
      if (boardState[b] === -1) {
        players[1]++
      }
    }
    return (players[0] <= players[1] ? 1 : -1)
  }

  occupy(location: number): boolean {
    if (this.getFreePositions().indexOf(location) !== -1) {
      this.board[location] = this.toMove()
      return true
    }
    return false
  }

  getBoard(): Board {
    return this.board
  }

  clear(): void {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  getFreePositions(boardState?: Board): Array<number> {
    if (!boardState) { boardState = this.board }

    var moves = []

    for (var move = 0; move < boardState.length; move++) {
      if (boardState[move] === 0) {
        moves.push(move)
      }
    }
    return moves
  }

  endOfGame(boardState?: Board): boolean {
    if (!boardState) { boardState = this.board }

    return this.getFreePositions(boardState).length === 0
  }

  winner(player: Player, boardState?: Board): boolean {
    if (!boardState) { boardState = this.board }

    var result = this.winnerWhere(player, boardState)

    return (result[0] !== -1 && result[1] !== -1)
  }

  /*

  function loser

  determines if player is a loser based on board
  input: boardState (optional, otherwise returns internal board), player
  output: true if player has lost

  */
  loser(player: Player, boardState?: Board): boolean {
    return this.winner(-player, boardState)
  }

  winnerWhere(player: Player, boardState?: Board): Array<number> {
    if (!boardState) { boardState = this.board }

    var diag1,
        diag2,
        row,
        col

    var config = this.config

    for (var r = 0; r < 3; r++) {
      row = boardState.slice(r * 3, (r * 3) + 3)

      if (count(row, player) === 3) {
        return [r * 3, (r * 3) + 3 - 1]
      }
    }

    for (var c = 0; c < 3; c++) {
      col = []
      for (var csub = c, iters = 0; csub < boardState.length && iters < 3; iters++, csub += 3) {
        col.push(boardState[csub])
      }
      if (count(col, player) === 3) {
        return [c, c + (3 * (3 - 1))]
      }
    }
    /*
      written this way so it can handle any sized tictactoe configuration and how many you need to win
      assuming its just a basic 3x3 box, this will still just run row*col times
    */

    for (var dc1 = 0; dc1 < (3 - 3 + 1); dc1++) {
      for (var dr1 = 0; dr1 < (3 - 3 + 1); dr1++) {

        diag1 = []
        diag2 = []

        for (var dsub = 0; dsub < 3; dsub++) {
          diag1.push(boardState[(dr1 * 3) + (dsub*(3 + 1))])
          diag2.push(boardState[(dr1 * 3) + 2 + (dsub*(3 - 1))])
        }

        if (count(diag1, player) === 3) {
          return [(dr1 * 3) + (0 * (3 + 1)), (dr1 * 3) + ((3 - 1) * (3 + 1))]
        }
        if (count(diag2, player) === 3) {
          return [(dr1 * 3) + 2 + (0 * (3 - 1)), (dr1 * 3) + 2 + ((3 - 1) * (3 - 1))]
        }
      }
    }
    return [-1, -1]
  }

  utility(boardState?: Board, player) {
    if (!boardState) { boardState = this.board }

    // 0 1 2
    // 3 4 5
    // 6 7 8
    var score = 0,
        markScore = [0, 1, 10, 1000],
        diag1 = [boardState[0], boardState[4], boardState[8]],
        diag2 = [boardState[2], boardState[4], boardState[6]],
        row,
        col

    var config = this.config

    for (var r = 0; r < 3 ; r++) {

      row = boardState.slice(r * 3, (r * 3) + 3)
      if (count(row, player) > 0 && count(row, -player) === 0)  {
        score += markScore[count(row, player)]
      }
      else if (count(row, -player) > 0 && count(row, player) === 0)  {
        score -= markScore[count(row, -player)]
      }
      col = [boardState[r], boardState[r + 3], boardState[r+6]]
      if (count(col, player) > 0 && count(col, -player) === 0) {
        score += markScore[count(col, player)]
      }
      else if (count(col, -player) > 0 && count(col, player) === 0) {
        score -= markScore[count(col, -player)]
      }
    }
    if (count(diag1, player) > 0 && count(diag1, -player) === 0) {
      score += markScore[count(diag1, player)]
    }
    else if (count(diag1, -player) > 0 && count(diag1, player) === 0) {
      score -= markScore[count(diag1, -player)]
    }
    if (count(diag2, player) > 0 && count(diag2, -player) === 0) {
      score += markScore[count(diag2, player)]
    }
    else if (count(diag2, -player) > 0 && count(diag2, player) === 0) {
      score -= markScore[count(diag2, -player)]
    }
    return score
  }

  chooseRandom(state: Array<number>, player: Player) {
    var possMoves = this.getFreePositions(state),
        result = possMoves[Math.floor(possMoves.length * Math.random())]
    return [player, 1, result]
  }

  alphaBetaSearch(state: Board, player: Player) {
    var biggestValue = -Infinity,
        possMoves = this.getFreePositions(state),
        newBoard = state.slice(0),
        result,
        tryMove,
        abs
    for (var i = 0; i < possMoves.length; i++) {
      tryMove = possMoves[i]
      newBoard[tryMove] = player

      if (this.winner(player, newBoard))
        return [player, 1000, tryMove]
      if (this.loser(player, newBoard))
        return [player, -1000, tryMove]

      abs = -this.negaMax(newBoard, 4 /*ply*/, -Infinity, Infinity, -player)

      if (abs > biggestValue) {
        biggestValue = abs
        result = tryMove
      }
      newBoard[tryMove] = 0
    }
    return [player, biggestValue, result]
  }

  negaMax(state, depth, alpha, beta, player) {

    if (this.endOfGame(state) || depth === 0 || this.winner(player, state) || this.loser(player, state)) {
      return this.utility(state, player)
    }
    var possMoves = this.getFreePositions(state),
        newBoard = state.slice(0),
        tryMove,
        val

    for (var i = 0; i < possMoves.length; i++) {
      tryMove = possMoves[i]

      newBoard[tryMove] = player

      val = -this.negaMax(newBoard, depth - 1, -beta, -alpha, -player)

      if (val >= beta) {
        return val
      }

      alpha = Math.max(val, alpha)

      newBoard[tryMove] = 0
    }
    return alpha
  }

}
tictactoe.ai = new AI()
