import React, { useEffect, useRef, useState, useCallback } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { RotateRightOutlined, RotateLeftOutlined } from '@ant-design/icons'
import { ERotateType, IRotatableImageProps } from './index.types'
import { getFitedDimensionImage, loadImage } from '~/utils'

const TOTAL_ROTATE_STEP = 4

const ZoomableWrapper = ({ children }) => {
  return (
    <TransformWrapper>
      <TransformComponent>{children}</TransformComponent>
    </TransformWrapper>
  )
}

const DefaultWrapper = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

export const RotatableImage = ({ src, className, zoomable, positionData }: IRotatableImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const container = containerRef.current
  const canvas = canvasRef.current
  const image = imageRef.current

  const [currentRotate, setCurrentRotate] = useState<number>(0)
  const [canvasMouted, setCanvasMounted] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  const ImageWrapper = zoomable ? ZoomableWrapper : DefaultWrapper

  const renderImage = useCallback(
    async (_src) => {
      try {
        const _image = await loadImage(_src)
        imageRef.current = _image

        const { fitedWidth, fitedHeight } = getFitedDimensionImage(_image, container?.clientWidth)
        canvas.width = fitedWidth
        canvas.height = fitedHeight

        const ctx = canvas.getContext('2d')
        ctx.drawImage(_image, 0, 0, fitedWidth, fitedHeight)
      } catch {}
    },
    [canvas, container?.clientWidth],
  )

  const drawInfoPosition = useCallback(
    ({ fitedImageWidth, fitedImageHeight, dataInfo }) => {
      const x = (dataInfo.x / image?.naturalWidth) * fitedImageWidth
      const y = (dataInfo.y / image?.naturalHeight) * fitedImageHeight

      const positionWidth = (dataInfo.width / image?.naturalWidth) * fitedImageWidth
      const positionHeight = (dataInfo.height / image?.naturalHeight) * fitedImageHeight

      let translateX = -canvas.width / 2
      let translateY = -canvas.height / 2

      const isHorizontal = Math.abs(currentRotate % 2) === 1

      if (isHorizontal) {
        [translateX, translateY] = [translateY, translateX]
      }

      const ctx = canvas.getContext('2d')
      ctx.translate(translateX, translateY)
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, positionWidth, positionHeight)
    },
    [canvas, currentRotate, image?.naturalHeight, image?.naturalWidth],
  )

  const drawImageWithRotate = useCallback(() => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    const { fitedHeight, fitedWidth, imageRatio } = getFitedDimensionImage(image, container?.clientWidth)

    let newCanvasHeight = fitedHeight
    let newFitedWidth = fitedWidth
    let newFitedHeight = fitedHeight

    if (Math.abs(currentRotate % 2) === 1) {
      newCanvasHeight = imageRatio * fitedWidth
      newFitedWidth = newCanvasHeight
      newFitedHeight = fitedWidth
    }

    canvas.width = fitedWidth
    canvas.height = newCanvasHeight

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((currentRotate * Math.PI) / 2)
    ctx.drawImage(image, -newFitedWidth / 2, -newFitedHeight / 2, newFitedWidth, newFitedHeight)
    ctx.restore()
    if (positionData) {
      drawInfoPosition({
        fitedImageWidth: newFitedWidth,
        fitedImageHeight: newFitedHeight,
        dataInfo: positionData,
      })
    }
  }, [canvas, container?.clientWidth, currentRotate, drawInfoPosition, image, positionData])

  useEffect(() => {
    if (canvasMouted) {
      renderImage(src)
    }
    const handleResize = () => {
      setContainerWidth(container?.clientWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [canvasMouted, container?.clientWidth, renderImage, src])

  useEffect(() => {
    if (image) {
      drawImageWithRotate()
    }
  }, [currentRotate, image, containerWidth, drawImageWithRotate, positionData])

  const handleCanvasRefChange = (ref) => {
    canvasRef.current = ref
    setCanvasMounted(true)
  }

  const handleChangeRotate = (rotateType: ERotateType) => {
    setCurrentRotate((prev) => {
      let newRotate = (prev + 1) % TOTAL_ROTATE_STEP
      if (rotateType === ERotateType.Decrement) {
        newRotate = (prev - 1) % TOTAL_ROTATE_STEP
      }
      return newRotate
    })
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex mb-3">
        <button onClick={() => handleChangeRotate(ERotateType.Decrement)}>
          <RotateLeftOutlined className="text-3xl mr-2" />
        </button>
        <button onClick={() => handleChangeRotate(ERotateType.Increment)}>
          <RotateRightOutlined className="text-3xl" />
        </button>
      </div>
      <ImageWrapper>
        <canvas ref={handleCanvasRefChange} width="300" height="300" />
      </ImageWrapper>
    </div>
  )
}
