const test = require('tape')
import { Board } from '../js/board.js'

test('winning board logic', function (t) {
  t.plan(8);
  t.ok(new Board([1,1,1,0,0,0,0,0,0]).isWinner(1))
  t.ok(new Board([0,0,0,1,1,1,0,0,0]).isWinner(1))
  t.ok(new Board([0,0,0,0,0,0,1,1,1]).isWinner(1))
  t.ok(new Board([1,0,0,1,0,0,1,0,0]).isWinner(1))
  t.ok(new Board([0,1,0,0,1,0,0,1,0]).isWinner(1))
  t.ok(new Board([0,0,1,0,0,1,0,0,1]).isWinner(1))
  t.ok(new Board([1,0,0,0,1,0,0,0,1]).isWinner(1))
  t.ok(new Board([0,0,1,0,1,0,1,0,0]).isWinner(1))
});

test('losing board logic', function (t) {
  t.plan(8);
  t.ok(new Board([1,1,1,0,0,0,0,0,0]).isLoser(-1))
  t.ok(new Board([0,0,0,1,1,1,0,0,0]).isLoser(-1))
  t.ok(new Board([0,0,0,0,0,0,1,1,1]).isLoser(-1))
  t.ok(new Board([1,0,0,1,0,0,1,0,0]).isLoser(-1))
  t.ok(new Board([0,1,0,0,1,0,0,1,0]).isLoser(-1))
  t.ok(new Board([0,0,1,0,0,1,0,0,1]).isLoser(-1))
  t.ok(new Board([1,0,0,0,1,0,0,0,1]).isLoser(-1))
  t.ok(new Board([0,0,1,0,1,0,1,0,0]).isLoser(-1))
})

test('return false if piece already there', function(t) {
  t.plan(1)

  let b = new Board()

  b.occupy(0)
  b.occupy(1)
  t.ok(!(b.occupy(0) || b.occupy(1) || !b.occupy(2)))
})

test('getFreePositions returns correct arrays', function(t) {
  const testSameArray = (ary1, ary2) => {
    if (ary1.length !== ary2.length) {
      return false
    }
    ary1 = ary1.sort((a, b) => a - b)
    ary2 = ary2.sort((a, b) => a - b)
    for (let c = 0; c < ary1.length; c++) {
      if (ary1[c] !== ary2[c]) {
        return false
      }
    }
    return true
  }
  t.plan(5)
  t.ok(testSameArray(new Board([0,0,0,0,0,0,1,1,1]).getFreePositions(), [0,1,2,3,4,5]))
  t.ok(testSameArray(new Board([1,0,0,0,0,0,0,0,0]).getFreePositions(), [1,2,3,4,5,6,7,8]))
  t.ok(testSameArray(new Board([1,1,0,0,0,0,0,0,0]).getFreePositions(), [2,3,4,5,6,7,8]))
  t.ok(testSameArray(new Board([1,1,1,0,0,0,0,0,0]).getFreePositions(), [3,4,5,6,7,8]))
  t.ok(testSameArray(new Board([0,0,0,0,0,0,0,0,0]).getFreePositions(), [0,1,2,3,4,5,6,7,8]))
})
