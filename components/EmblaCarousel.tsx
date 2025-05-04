import React, { useEffect } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
  setEmblaApi: (embla: EmblaCarouselType) => void
}

const EmblaCarousel: React.FC<PropType> = ({slides, options, setEmblaApi}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)


  useEffect(() => {
    if (emblaApi) setEmblaApi(emblaApi)
  }, [emblaApi, setEmblaApi]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {slides.map((src, index) => (
            <div className="embla__slide min" key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="rounded-xl h-auto object-stretch max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
