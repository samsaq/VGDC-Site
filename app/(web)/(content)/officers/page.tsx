"use client";
import { EmblaOptionsType } from "embla-carousel";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatedContent } from "@/components/AnimatedContent";
import { EmblaCarouselType } from "embla-carousel"
const images = [
    "https://preview.redd.it/uni-the-cat-v0-bcqh4egtg40c1.jpg?width=640&crop=smart&auto=webp&s=a872636b5172aefa188065947477f5d809f2ab35",
    "https://preview.redd.it/uni-the-cat-v0-cyacndgtg40c1.jpg?width=1080&crop=smart&auto=webp&s=22ed4b7c9e400ab7a56531e2e75be2a10251227e",
    "https://preview.redd.it/uni-the-cat-v0-u6no4egtg40c1.jpg?width=640&crop=smart&auto=webp&s=8746765938b901e683e05e486e96bdbf39ee40f6",
    "https://preview.redd.it/uni-the-cat-v0-9ckwsdgtg40c1.jpg?width=1080&crop=smart&auto=webp&s=07ec6059ec16ed946fa9bf99ea89f5e59eccadb2",
    "https://preview.redd.it/uni-the-cat-v0-9oocldgtg40c1.jpg?width=1080&crop=smart&auto=webp&s=9e137de6fc71ac068d16a4a44d473a4e1eb5f725",
]
export default function officers()
{   
    const SLIDES = Array.from(images);
    const OPTIONS: EmblaOptionsType = {};
    const [loading, setLoading] = useState(true);
    const contentSectionRef = useRef<HTMLDivElement>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel(
    {
        loop: false,
        align: "center",
        containScroll: false,
        dragFree: false, //can use mouse to drag
        slidesToScroll: 1, //How many slides per scroll
    }
    )
    return(
        <section className="overflow-hidden">{/*Page container */}
            <div className="relative h-[350px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                    {loading ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>No games available</p>
                        </div>
                                            ) : (
                        images.map((officer, index) => (
                        <div
                        key={officer.slug || index}
                        className="embla__slide relative flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <div className="flex h-full w-full items-center justify-center px-4">
                                {officer.coverImage ? (
                                    <div className="flex h-[90%] w-[90%] items-center justify-center">
                                        <img
                                            src={officer.coverImage}
                                            alt={officer.title}
                                            className="max-h-full max-w-full object-contain"/>
                                    </div>
                                                    ) : (
                                    <div className="flex h-[90%] w-[90%] items-center justify-center rounded-lg bg-gray-200">
                                        <p>No image available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
            <div className="w-1/10 flex justify-center py-10">{/*select line container*/}
                <div className="h-[4px] w-[150px] bg-orange-400"></div>
                </div>
                <div className="w-3/10 font-outfit flex">{/*triple split container*/}
                    <div className="w-1/3 text-orange-400">{/*caption header */}
                        <strong className="text-6xl">Meet our club officers</strong>
                    </div>
                    <div className="w-1/3">{/*Officer info content */}
                        <div>
                            <strong className="text-xl text-gray-500">Name &emsp; Major: </strong>
                        </div>
                        <h1>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat gravida malesuada quam commodo id integer nam.
                        </h1>
                    </div>
                    {/*Nav Buttons */} 
                    <div className="w-1/3 flex justify-center px-2 space-x-4">
                        <button
                            className="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center text-white text-4xl hover:bg-orange-500"
                            onClick={() => emblaApi?.scrollPrev()}
                            >
                            <span>&lt;</span>
                        </button>
                        <button
                            className="bg-orange-400 rounded-full w-20 h-20 flex items-center justify-center text-white text-4xl hover:bg-orange-500"
                            onClick={() => emblaApi?.scrollNext()}
                            >
                            <span>&gt;</span>
                        </button>
                    </div> 
                </div>{/*End triple split container */}
        </section>
    )
}