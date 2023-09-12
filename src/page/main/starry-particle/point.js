class Point {
  // x位置
  x

  // y位置
  y

  // x方向每次偏移量
  dx

  // y方向每次偏移量
  dy

  // 点的颜色
  color

  // 半径大小
  r

  context

  // 初始化
  constructor(context, x, y, dx, dy, color, r) {
    this.context = context
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.color = color
    this.r = r
  }
 
  draw(color, r) {
    this.r = r || this.r
    const {context} = this
    context.beginPath()
    context.arc(this.x, this.y, r || this.r, 0, Math.PI * 2)
    context.fillStyle = color || this.color 
    context.closePath()
    context.fill()
  }

  move() {
    this.x += this.dx
    if (this.x < this.r) {
      this.x = this.r
      this.dx = -this.dx
    }
    if (this.x > window.innerWidth - this.r) {
      this.x = window.innerWidth - this.r
      this.dx = -this.dx
    }
    this.y += this.dy
    if (this.y < this.r) {
      this.y = this.r
      this.dy = -this.dy
    }
    if (this.y > window.innerHeight - this.r) {
      this.y = window.innerHeight - this.r
      this.dy = -this.dy
    }
  }
}

export default Point
