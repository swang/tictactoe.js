var main = (function() { 
  var system = tictactoe.ai,
      draw = tictactoe.draw,
      canvas = document.getElementById("the_board"),
      context = canvas.getContext("2d"),
      gameOver = false
      
  $(document).ready(function() {
    $('#the_board').center()
    draw.setContext(canvas)
    draw.setContext(context)
    draw.board()
    draw.newGameButton()
  })
  jQuery.fn.center = function () {
  	this.css("position","absolute")
  	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px")
  	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px")
  	return this
  }
  
  $(window).bind('resize', function() {
    $('#the_board').center()
  })
  
  $('#the_board').bind('click',function(e){
    var whoseTurn,
        occupy,
        offsetX = !e.offsetX ? (e.pageX - this.offsetLeft) : e.offsetX,
        offsetY = !e.offsetY ? (e.pageY - this.offsetTop) : e.offsetY,
        location = (Math.floor(offsetY / 100)*3 + Math.floor(offsetX / 100))

    if (offsetY > 300) {
      system.clear()
      draw.clear()
      gameOver = false
    }
        
    else if (offsetY <= 300 && offsetX <= 300) {
      whoseTurn = system.toMove()
      occupy = system.occupy(location)
      if (occupy && !gameOver) {
        draw.nought(location)
        if (system.winner(1)) {
          
          draw.connectLine(system.winnerWhere(1),"#00ff00")
          draw.stamp("YOU WIN","#00ff00")
          gameOver = true
        }
        else if (system.getFreePositions().length == 0) {
          draw.stamp("TIE","#00ffff")
          gameOver = true
        }
        
        if (whoseTurn == 1 && !system.winner(1) && !system.winner(-1)) {
          var res = system.alphaBetaSearch(system.board(),-whoseTurn )
          
          // to test win scenario, create ai that randomly chooses a valid turn.
          // var res = system.chooseRandom(system.board(),-whoseTurn )
          
          system.occupy(res[2])
          draw.cross(res[2])
          
          if (system.winner(-1)) {
             draw.connectLine(system.winnerWhere(-1),"#ff0000")
             draw.stamp("YOU LOSE","#ff0000")
             gameOver = true
          }
        }
      }
    }
    
  })
}())
