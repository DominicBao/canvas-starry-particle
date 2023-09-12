// 线性比例尺
class LinearScale {
  sourceStart

  sourceEnd

  targetStart

  // targetEnd
  dis

  constructor(sourceStart, sourceEnd, targetStart, targetEnd) {
    this.sourceStart = sourceStart
    this.sourceEnd = sourceEnd
    this.targetStart = targetStart
    // this.targetEnd = targetEnd
    this.dis = targetEnd - targetStart
  }

  getValue(value) {
    return this.targetStart + this.dis * ((value - this.sourceStart) / (this.sourceEnd - this.sourceStart))
  }
}

export default LinearScale
