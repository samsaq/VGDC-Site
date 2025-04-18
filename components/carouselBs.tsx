// components/CarouselButtons.tsx
import React from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './carouselButtons'

type Props = {
  emblaApi: EmblaCarouselType | null
}

const carouselBs: React.FC<Props> = ({ emblaApi }) => {
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi ?? undefined)

  return (
    <div className="flex justify-center space-x-4">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  )
}

export default carouselBs
