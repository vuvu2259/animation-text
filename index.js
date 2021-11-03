class Canvas {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.w
    this.canvas.height = this.h
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.direct = 1

    this.ctx.font = '30px Arial'
    this.text = 'Amazing Coding'
    this.textWidth = this.ctx.measureText(this.text).width
    console.log(this.textWidth)

    this.textPosition = {
      x: this.w / 2,
      y: this.h / 2,
    }
    this.lineBarPosition = {
      x: this.w / 2 - this.textWidth / 2,
      y: this.h / 2,
    }

    this.layerPosition = {
      x: this.w / 2 - this.textWidth / 2,
      y: this.h / 2,
    }
    console.log(this.layerPosition)
    this.loop()
  }

  loop() {
    this.update()
    this.draw()
    window.requestAnimationFrame(() => {
      this.loop()
    })
  }

  update() {
    this.lineBarPosition.x += 5 * this.direct
    this.layerPosition.x += 5 * this.direct

    if (
      this.lineBarPosition.x >= this.w / 2 + this.textWidth / 2 + 50 ||
      this.lineBarPosition.x <= this.w / 2 - this.textWidth / 2 - 50
    ) {
      this.direct *= -1
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h)

    this.ctx.beginPath()

    this.ctx.fillStyle = '#fff'
    this.ctx.font = '30px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.save()
    this.ctx.translate(0, 0)
    for (let index = 0; index < 20; index++) {
      this.ctx.shadowColor = '#00b3ff'
      this.ctx.shadowBlur = 3 + index * 0.25

      this.ctx.fillText(this.text, this.textPosition.x, this.textPosition.y)
    }
    this.ctx.restore()
    this.ctx.closePath()

    this.ctx.beginPath()
    this.ctx.shadowColor = 'rgba(0,0,0,0)'
    this.ctx.fillStyle = '#000'
    this.ctx.rect(this.layerPosition.x, this.layerPosition.y - 20, this.w, 40)
    this.ctx.fill()

    this.ctx.closePath()

    this.ctx.beginPath()
    for (let index = 0; index < 20; index++) {
      this.ctx.shadowColor = '#00b3ff'
      this.ctx.shadowBlur = 3 + index * 0.25
      this.ctx.strokeRect(this.lineBarPosition.x, this.lineBarPosition.y - 20, 10, 40)
    }
    this.ctx.fillStyle = '#fff'
    this.ctx.rect(this.lineBarPosition.x, this.lineBarPosition.y - 20, 10, 40)
    this.ctx.fill()
    this.ctx.closePath()
  }
}

const canvas = new Canvas(window.innerWidth, window.innerHeight)
