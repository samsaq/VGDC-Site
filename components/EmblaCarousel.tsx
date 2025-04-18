// components/EmblaCarousel.tsx
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
  setEmblaApi: (api: EmblaCarouselType | null) => void
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options, setEmblaApi }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  useEffect(() => {
    if (emblaApi) {
      setEmblaApi(emblaApi)
    }
  }, [emblaApi, setEmblaApi])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((src, index) => (
          <div className="embla__slide" key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-[400px] h-[300px] object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel
