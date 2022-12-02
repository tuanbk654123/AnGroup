export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image()
      image.src = src
      image.onload = () => {
        resolve(image)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export const getFitedDimensionImage = (image: HTMLImageElement, maxWidth?: number) => {
  const imageWidth = image.naturalWidth
  const imageHeight = image.naturalHeight
  const imageRatio = imageWidth / imageHeight

  let fitedWidth = imageWidth
  let fitedHeight = imageHeight

  if (maxWidth) {
    fitedWidth = maxWidth
    fitedHeight = maxWidth / imageRatio
  }
  return { fitedWidth, fitedHeight, imageRatio }
}
