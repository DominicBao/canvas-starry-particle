import React, {useEffect, useRef} from 'react'
import * as dat from 'dat.gui'
import StarryParticle from './starry-particle/starry-particle'
import './main.less'

const Main = () => {
  const canvasRef = useRef()
  useEffect(() => {
    const gui = new dat.GUI({closed: false})
    const starryParticle = new StarryParticle(canvasRef?.current, gui)
    starryParticle.init()
    starryParticle.draw()
  }, [])
  return <div>
    <canvas ref={canvasRef} id="starSky" className="myCanvas" />
    <a onClick={e => {
      window.open('https://github.com/DominicBao/canvas-starry-particle')
      e.preventDefault()
    }} href="https://github.com/DominicBao/canvas-starry-particle">源码</a> 
  </div>
}

export default Main
