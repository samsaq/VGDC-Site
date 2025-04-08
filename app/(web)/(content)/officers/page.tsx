"use client";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useCallback, useState, useEffect } from "react";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
  } from '@/components/carouselButtons'
export default function officers()
{   
    const OPTIONS: EmblaOptionsType = {};
    const SLIDE_COUNT = 10;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  
    const [emblaApi, setEmblaApi] = useState<any>(null);
  
    useEffect(() => {
      if (emblaApi) {
        emblaApi.reInit();
      }
    }, [emblaApi]);
  
    const nextSlide = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);
  
    const prevSlide = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
    
    return(
        <div>{/*Page container */}
             <div>{/*Non navbar container*/}
                <div>
                <div className="w-full max-w-[800px] h-auto overflow-hidden flex justify-center items-center mx-auto">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
                </div>
                    <div className="w-1/10 flex justify-center py-10">{/*select line container*/}
                        <div className="h-[4px] w-[150px] bg-orange-400"></div>
                    </div>
                    <div className="w-3/10 font-outfit flex">{/*triple split container*/}
                        <div className="w-1/3 text-orange-400">{/*caption header */}
                            <strong className="text-6xl">Meet our club officers</strong>
                        </div>
                        <div className="w-1/3">
                            <div>
                                <strong className="text-xl text-gray-500">Name &emsp; Major: </strong>
                            </div>
                            <h1>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat gravida malesuada quam commodo id integer nam.
                            </h1>
                        </div>
                        <div className="w-1/3 flex justify-center px-2 space-x-4">
                            <button className="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center text-white text-4xl">
                                <span>&lt;</span>
                            </button>
                            <button className="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center text-white text-4xl">
                                <span className="text-light"> &gt; </span>
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
   
}