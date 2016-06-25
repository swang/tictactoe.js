'use strict';
// @flow

class Draw {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;

  setCanvas(cnvs: HTMLCanvasElement): void {
    this.canvas = cnvs
    this.centerX = cnvs.width / 2
    this.centerY = cnvs.height / 2
  }

  setContext(ctxt: CanvasRenderingContext2D): void {
    this.context = ctxt
  }

  board(): void {
    var context = this.context
    context.beginPath()

    context.lineWidth = 5
    context.strokeStyle = 'black'

    context.moveTo(100, 0)
    context.lineTo(100, 300)

    context.moveTo(200, 0)
    context.lineTo(200, 300)

    context.moveTo(0, 100)
    context.lineTo(300, 100)

    context.moveTo(0, 200)
    context.lineTo(300, 200)

    context.stroke()

    context.closePath()

  }

  newGameButton(): void {
    var context = this.context
    context.beginPath()
    context.rect(5, 310, 290, 80)
    context.fillStyle = '#39e42d'
    context.fill()
    context.lineWidth = 5
    context.strokeStyle = 'black'
    context.stroke()

    context.closePath()

    context.textAlign = 'center'
    context.textBaseline = 'top'

    context.fillStyle = '#ffffff'
    context.strokeStyle = '#000000'
    context.font = '36pt Helvetica'
    context.strokeText('NEW GAME', 150, 320)
    context.fillText('NEW GAME', 150, 320)
  }

  getPos(location: number): Tuple {
    return [Math.floor(location / 3), location % 3]
  }

  X(location: number): void {
    const context = this.context
    const [row, col] = this.getPos(location)
    const topLeftX = (col * 100)
    const topLeftY = (row * 100)

    context.beginPath()

    context.moveTo(topLeftX + 20, topLeftY + 20)
    context.lineTo(topLeftX + 80, topLeftY + 80)

    context.moveTo(topLeftX + 80, topLeftY + 20)
    context.lineTo(topLeftX + 20, topLeftY + 80)

    context.closePath()

    context.lineWidth = 5
    context.strokeStyle = 'black'
    context.stroke()
  }

  O(location: number): void {
    const context = this.context
    const [row, col] = this.getPos(location)
    const centerX = (col * 100) + 50
    const centerY = (row * 100) + 50
    const radius = 40

    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.closePath()

    context.lineWidth = 5
    context.strokeStyle = 'black'
    context.stroke()
  }

  stamp(text: string, color: string): void {
    const context = this.context

    context.save()

    context.rotate(-Math.PI * 2 / 12)
    context.translate(57, 190)
    context.beginPath()
    context.rect(-150, -20, 290, 80)
    context.fillStyle = 'rgba(255, 255, 255, 0.75)'
    context.fill()
    context.lineWidth = 5
    context.strokeStyle = color
    context.stroke()
    context.closePath()

    context.textAlign = 'center'
    context.textBaseline = 'top'

    context.fillStyle = '#ffffff'
    context.strokeStyle = color
    context.font = '36pt Helvetica'
    context.strokeText(text, 0, -10)
    context.fillText(text, 0, -10)

    context.restore()
  }

  connectLine(where: Tuple, color: string): void {
    const context = this.context

    const [fromRow, fromCol] = this.getPos(where[0]),
        [toRow, toCol] = this.getPos(where[1])

    var modX1 = 0,
        modY1 = 0,
        modX2 = 0,
        modY2 = 0

    context.beginPath()

    if (fromCol === toCol) {
      modX1 = 50
      modX2 = 50
      modY1 = 20
      modY2 = 100 - modY1
    }
    if (fromRow === toRow) {
      modX1 = 20
      modX2 = 100 - modX1
      modY1 = 50
      modY2 = 50
    }
    if ((fromRow !== toRow) && (fromCol !== toCol)) {
      modX1 = (fromRow === fromCol && toRow === toCol) ? 20 : 80
      modX2 = (fromRow === fromCol && toRow === toCol) ? 80 : 20

      modY1 = 20
      modY2 = 80
    }

    context.moveTo(fromCol * 100 + modX1, fromRow * 100 + modY1)
    context.lineTo(toCol * 100 + modX2 , toRow * 100  + modY2)
    context.lineCap = 'round'
    context.closePath()

    context.lineWidth = 15
    context.strokeStyle = color

    context.stroke()

  }

  clear(): void {
    this.context.clearRect(0, 0, 300, 400)
    this.board()
    this.newGameButton()
  }

}
