const test = require('tape')

import { Board } from '../js/board.js'
const AI = require('../js/tictactoe.ai.js').AlphaBetaAI

test('making the right moves', function(t) {
  let b = new Board([
    -1, 0, 0,
    -1, 1, 1,
     0, 1, 0
  ])

  let a = new AI(b)
  let res = a.choose(-1)
  t.plan(2)
  t.ok(res[0], -1)
  t.ok(res[2], 6)
})
