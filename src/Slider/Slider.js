import React, { useState, useEffect, useCallback } from 'react'

import './style.scss'

const Slider = ({
  images = [],
  activeImageIndex = 0,
  animationDelay = 3e2
}) => {
  const [activeImage, setActiveImage] = useState(activeImageIndex)
  const [temporaryImage, setTemporaryImage] = useState(null)
  const [isAnimationActive, setAnimationActive] = useState(false)

  const lastImageIndex = images.length - 1

  const goToImage = useCallback(
    (index, circular) => {
      if (index === activeImage) return

      let direction = index < activeImage

      // invert direction for infinite
      if (
        circular &&
        ((index === 0 && activeImage === lastImageIndex) ||
          (activeImage === 0 && index === lastImageIndex))
      ) {
        direction = !direction
      }

      setTemporaryImage({
        fromLeft: direction,
        index: index
      })
    },
    [activeImage, lastImageIndex]
  )

  const setPrev = useCallback(
    () => goToImage(activeImage === 0 ? lastImageIndex : activeImage - 1, true),
    [activeImage, goToImage, lastImageIndex]
  )

  const setNext = useCallback(
    () => goToImage(activeImage === lastImageIndex ? 0 : activeImage + 1, true),
    [activeImage, goToImage, lastImageIndex]
  )

  // animation implementation
  useEffect(() => {
    if (!temporaryImage) {
      return
    }

    setAnimationActive(true)

    const animationEndTimer = setTimeout(() => {
      setActiveImage(temporaryImage.index)
      setTemporaryImage(null)
      setAnimationActive(false)
    }, animationDelay)

    return () => {
      clearTimeout(animationEndTimer)
    }
  }, [temporaryImage, animationDelay])

  return (
    <div className="slider">
      <div
        className="slider__images"
        style={
          temporaryImage
            ? {
                transition: `all ${animationDelay / 1000}s`,
                left:
                  temporaryImage.fromLeft !== isAnimationActive ? '-100%' : '0%'
              }
            : {}
        }
      >
        {temporaryImage && temporaryImage.fromLeft ? (
          <div
            className="slider__image"
            style={{
              backgroundImage: `url(${images[temporaryImage.index]})`
            }}
          />
        ) : null}

        <div
          className="slider__image"
          style={{
            backgroundImage: `url(${images[activeImage]})`
          }}
        />

        {temporaryImage && !temporaryImage.fromLeft ? (
          <div
            className="slider__image"
            style={{
              backgroundImage: `url(${images[temporaryImage.index]})`
            }}
          />
        ) : null}
      </div>
      <div className="slider__prev" onClick={setPrev} />
      <div className="slider__next" onClick={setNext} />
      <div className="slider__navigation">
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => goToImage(index)}
            className={`slider__navigation-item${
              index === activeImage ? ' active' : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slider
