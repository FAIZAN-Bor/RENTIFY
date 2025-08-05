"use client"

import React, { useState, useEffect } from "react"

const BackgroundCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  
  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg'
  ]

//   love u abdullah bhai
  useEffect(() => {
    // Preload images for smooth transitions
    const preloadImages = () => {
      const loadPromises = images.map((src, index) => {
        return new Promise<boolean>((resolve) => {
          const img = new Image()
          img.onload = () => {
            console.log(`Image ${index + 1} loaded successfully: ${src}`)
            resolve(true)
          }
          img.onerror = () => {
            console.error(`Failed to load image ${index + 1}: ${src}`)
            resolve(false)
          }
          img.src = src
        })
      })

      Promise.all(loadPromises).then((results) => {
        setImagesLoaded(results)
        setIsLoaded(true)
        console.log('All images processed:', results)
      })
    }

    preloadImages()

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 6000) // Change image every 6 seconds for better viewing

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentImage(index)
  }

  if (!isLoaded) {
    return (
      <div className="bg-image bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 active" />
    )
  }

  return (
    <>
      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`bg-image ${
            index === currentImage ? 'active' : ''
          }`}
          style={{
            backgroundImage: imagesLoaded[index] ? `url(${image})` : 'none',
            backgroundColor: imagesLoaded[index] ? 'transparent' : '#1f2937',
          }}
        />
      ))}

      {/* Carousel Dots Indicator */}
      <div className="bg-carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`bg-carousel-dot ${
              index === currentImage ? 'active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export default BackgroundCarousel
