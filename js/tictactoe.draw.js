'use strict';
// @flow

const width: number = 450
const colW: number = Math.round(width/3)

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

    context.moveTo(colW, 0);
    context.lineTo(colW, width);

    context.moveTo(colW * 2, 0);
    context.lineTo(colW * 2, width);

    context.moveTo(0, colW);
    context.lineTo(width, colW);

    context.moveTo(0, colW * 2);
    context.lineTo(width, colW * 2);

    context.stroke()

    context.closePath()

  }

  newGameButton(): void {
    var context = this.context
    context.beginPath()

    context.rect(5, width + 10, width - 10, 600 - width - 20);

    context.fillStyle = '#39e42d'
    context.fill()
    context.lineWidth = 10
    context.strokeStyle = 'black'
    context.stroke()

    context.closePath()

    context.textAlign = 'center'
    context.textBaseline = 'top'

    context.fillStyle = '#ffffff'
    context.strokeStyle = '#000000'
    context.font = '56pt Helvetica'
    // context.strokeText('NEW GAME', width/2, width + 30)
    context.fillText('NEW GAME', width/2, width + 30)
  }

  getPos(location: number): Tuple {
    return [Math.floor(location / 3), location % 3]
  }

  X(location: number): void {
    const context = this.context
    const [row, col] = this.getPos(location)
    const topLeftX = (col * colW)
    const topLeftY = (row * colW)
    const pad = 20
    const rpad = colW - pad

    context.beginPath()

    context.moveTo(topLeftX + pad, topLeftY + pad)
    context.lineTo(topLeftX + rpad, topLeftY + rpad)

    context.moveTo(topLeftX + rpad, topLeftY + pad)
    context.lineTo(topLeftX + pad, topLeftY + rpad)

    context.closePath()

    context.lineWidth = 20
    context.strokeStyle = 'blue'
    context.stroke()
  }

  O(location: number): void {
    const context = this.context
    const [row, col] = this.getPos(location)
    const centerX = (col * colW) + (colW/2)
    const centerY = (row * colW) + (colW/2)
    const radius = (colW/2) - 20

    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.closePath()

    context.lineWidth = 20
    context.strokeStyle = 'red'
    context.stroke()
  }

  stamp(text: string, color: string): void {
    const context = this.context

    context.save()

    context.rotate(-Math.PI * 2 / 12)
    context.translate(57, 190)

    context.beginPath()
    context.rect(-170, 80, 400, 100)

    // context.rect(-150, -20, 290, 80)
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
    context.font = '55pt Helvetica'
    context.strokeText(text, 30, 90)
    context.fillText(text, 30, 90)

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

    var pad = 20
    var rpad = (colW - pad)

    context.beginPath()

    if (fromCol === toCol) {
      modX1 = colW/2
      modX2 = colW/2
      modY1 = pad
      modY2 = colW - modY1
    }
    if (fromRow === toRow) {
      modX1 = pad
      modX2 = colW - modX1
      modY1 = colW/2
      modY2 = colW/2
    }
    if ((fromRow !== toRow) && (fromCol !== toCol)) {
      modX1 = (fromRow === fromCol && toRow === toCol) ? pad : rpad
      modX2 = (fromRow === fromCol && toRow === toCol) ? rpad : pad

      modY1 = pad
      modY2 = rpad
    }

    context.moveTo(fromCol * colW + modX1, fromRow * colW + modY1)
    context.lineTo(toCol * colW + modX2 , toRow * colW + modY2)
    context.lineCap = 'round'
    context.closePath()

    context.lineWidth = 40
    context.strokeStyle = color

    context.stroke()

  }

  clear(): void {
    this.context.clearRect(0, 0, 450, 600)
    this.board()
    this.newGameButton()
  }

}

module.exports = Draw
