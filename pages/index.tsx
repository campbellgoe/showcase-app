import Head from 'next/head'
import {
  Container,
  Main,
  Title,
  Description,
} from '../components/sharedstyles'
import Cards from '../components/cards'
import { useCallback, useEffect, useRef, useState } from 'react'

const imagePaths = [
['/images/forget-me-nots.jpeg', 1536, 2048]
]

const Canvas = () => {
  const canvasEl = useRef(null)
  const [images, setImages] = useState([])
  const initImages = useCallback(() => {
    const imageWidth = 1536
    const imageHeight = 2048
    const image = new Image(imageWidth, imageHeight)
    image.onload = () => {
      //
      setImages([[image, imageWidth, imageHeight]])
    }
    // @ts-ignore
    image.src = imagePaths[0][0]
  }, [])
  const draw = useCallback(ctx => {
    const viewWidth = window.innerWidth
    const viewHeight = window.innerHeight
    images.forEach(([image, width, height], index) => {
      ctx.globalAlpha = 0.5
      ctx.drawImage(image, viewWidth/2-width/2, viewHeight/2-height/2, width, height)
    })
  }, [images])
  const handleResize = useCallback((canvas, ctx) => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw(ctx)
  }, [])
  
  useEffect(() => {
    initImages()
    const c = canvasEl.current
    if(c){
      const ctx = c.getContext('2d')
      const resize = () => handleResize(c, ctx)
      resize()
     
      window.addEventListener('resize', resize, false)
      return () => {
        window.removeEventListener('resize', resize, false)
      }
    }
  }, [])
  return <canvas ref={canvasEl}/>
}

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Photos and Art</title>
        <meta name="description" content="Photography and Art" />
        <link rel="icon" href="/favicon.gif" />
      </Head>
      <Main>
        <Canvas/>
      </Main>
    </Container>
  )
}
