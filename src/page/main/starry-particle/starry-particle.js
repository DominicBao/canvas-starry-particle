import {POINT_NUM, LINE_DISTANCE, RADIUS, MIN_MOVE, MAX_MOVE} from './data'
import Point from './point'
import LinearScale from './linear-scale'
import {getRandomNum} from './util'

class StarryParticle {
  canvas

  points

  context

  lineScale

  mousePoint = {
    x: -999,
    y: -999,
  }

  gui

  option = {
    background: '#456', 
    pointColor: '#FFF',
    RADIUS,
    POINT_NUM,
    lineWidth: 1.2,
    lineColor: '#FFFFFF',
    LINE_DISTANCE,
    MIN_MOVE,
    MAX_MOVE,
  }

  constructor(canvasDom, gui) {
    this.canvas = canvasDom
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')
    this.lineScale = new LinearScale(0, this.option.LINE_DISTANCE * this.option.LINE_DISTANCE, 0.8, 0)
    this.points = []
    this.gui = gui

    window.addEventListener('mousemove', e => {
      this.mousePoint.x = e.clientX
      this.mousePoint.y = e.clientY
    })
    
    document.addEventListener('mouseout', () => {
      this.mousePoint.x = -999
      this.mousePoint.y = -999
    })

    this.initGui()
  }

  initGui() {
    // 颜色
    this.gui.addColor(this.option, 'background').name('背景颜色')
    this.gui.add(this.option, 'POINT_NUM').onChange(() => {
      this.points = []
      this.init()
    }).name('点的数量')
    
    const point = this.gui.addFolder('点设置')
    point.addColor(this.option, 'pointColor').name('点颜色')
    point.add(this.option, 'RADIUS').name('点半径')
    point.add(this.option, 'MIN_MOVE').onChange(() => {
      this.points = []
      this.init()
    }).name('最小移动速度')
    point.add(this.option, 'MAX_MOVE').onChange(() => {
      this.points = []
      this.init()
    }).name('最大移动速度')

    const line = this.gui.addFolder('线设置')
    line.add(this.option, 'lineWidth').name('线粗细')
    line.addColor(this.option, 'lineColor').name('线颜色')
    line.add(this.option, 'LINE_DISTANCE').name('线长')
  }

  init() {
    for (let index = 0; index < this.option.POINT_NUM; index++) {
      this.points.push(new Point(
        this.context,
        getRandomNum(this.option.RADIUS, window.innerWidth - this.option.RADIUS), 
        getRandomNum(this.option.RADIUS, window.innerHeight - this.option.RADIUS), 
        getRandomNum(this.option.MIN_MOVE, this.option.MAX_MOVE) * (Math.random() > 0.5 ? -1 : 1),
        getRandomNum(this.option.MIN_MOVE, this.option.MAX_MOVE) * (Math.random() > 0.5 ? -1 : 1), 
        this.option.pointColor, 
        this.option.RADIUS
      ))
    }
  }

  drawLine(souPoint, tarPoint, style = {}) {
    this.context.beginPath()
    Object.keys(style).forEach(name => {
      this.context[name] = style[name]
    })
    this.context.moveTo(souPoint.x, souPoint.y)
    this.context.lineTo(tarPoint.x, tarPoint.y)
    this.context.closePath()
    this.context.stroke()
  }

  calcLine(souPoint, tarPoint) {
    const dx = souPoint.x - tarPoint.x
    const dy = souPoint.y - tarPoint.y
    const distance = dx * dx + dy * dy
    if (distance < this.option.LINE_DISTANCE * this.option.LINE_DISTANCE) {
      const style = {
        strokeStyle: this.option.lineColor,
        globalAlpha: `${this.lineScale.getValue(distance)}`,
        lineWidth: this.option.lineWidth,
      }
      this.drawLine(souPoint, tarPoint, style)
    }
  }

  upDate() {
    for (let index = 0; index < this.points.length; index++) {
      this.points[index].move()
      this.points[index].draw(this.option.pointColor, this.option.RADIUS)
    }
    // 计算每个点之间的距离并进行连线
    const realPoints = this.points.concat([this.mousePoint])
    for (let index = 0; index < realPoints.length; index += 1) {
      for (let j = index + 1; j < realPoints.length; j += 1) {
        this.calcLine(realPoints[index], realPoints[j])
      }
    }
  }

  draw() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context.fillStyle = this.option.background
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.upDate()
    window.requestAnimationFrame(() => { this.draw() })
  }
}

export default StarryParticle
