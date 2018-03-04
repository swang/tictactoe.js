'use strict';

// @flow
const AlphaBetaAI = require('./tictactoe.ai.js').AlphaBetaAI
// const RandomAI = require('./tictactoe.ai.js').RandomAI
const AI = require('./tictactoe.ai.js').AI
const Draw = require('./tictactoe.draw.js')

declare class tictactoe {
  static ai: AI;
  static draw: Draw;
}

const main = (function() {
  // to test win scenario, use ai that randomly chooses a valid turn.
  // const system = new RandomAI()
  const system = new AlphaBetaAI()
  const draw = new Draw()

  let canvas: HTMLCanvasElement = (document.getElementById('the_board'): any)
  if (!(canvas instanceof HTMLCanvasElement)) {
    return
  }

  let context: CanvasRenderingContext2D = (canvas.getContext('2d'): any)
  if (!(context instanceof CanvasRenderingContext2D)) {
    return
  }

  document.addEventListener('DOMContentLoaded', () => {
    draw.setContext(context)
    draw.board()
    draw.newGameButton()
  })

  function getOffset(x: number, y: number): BoardPos {
    const result: number = Math.floor(y / (450/3)) * 3 + Math.floor(x / (450/3))
    switch (result) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8: return result
      default: return -1
    }
  }

  canvas.addEventListener('click', (e: any) => {
    let gameOver = false
    if (!(e instanceof Event)) {
      return
    }
    const offsetX: number = e.offsetX
    const offsetY: number = e.offsetY
    const location: BoardPos = getOffset(offsetX, offsetY)

    if (offsetY > 450) {
      system.getBoard().clear()
      draw.clear()
      gameOver = false
    }

    else if (offsetY <= 450 && offsetX <= 450) {
      const whoseTurn = system.getBoard().getTurn()
      const occupy = system.getBoard().occupy(location)

      if (occupy && !gameOver) {
        draw.O(location)
        if (system.getBoard().isWinner(1)) {

          draw.connectLine(system.getBoard().winnerPos(1), '#00ff00')
          draw.stamp('YOU WIN', '#00ff00')
          gameOver = true
        }
        else if (system.getBoard().getFreePositions().length === 0) {
          draw.stamp('TIE', '#00ffff')
          gameOver = true
        }

        if (whoseTurn === 1 && !system.getBoard().isWinner(1) && !system.getBoard().isWinner(-1)) {
          let res = system.choose(-whoseTurn)
          system.getBoard().occupy(res[2])
          draw.X(res[2])

          if (system.getBoard().isWinner(-1)) {
            draw.connectLine(system.getBoard().winnerPos(-1), '#ff0000')
            draw.stamp('YOU LOSE', '#ff0000')
            gameOver = true
          }
        }
      }
    }
  })
}())
