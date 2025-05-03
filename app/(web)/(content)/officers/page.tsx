"use client";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useState, useEffect } from "react";
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
    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
    const SLIDES = Array.from(images);
    const OPTIONS: EmblaOptionsType = {};
    
    return(
        <section className="flex overflow-hidden">{/*Page container */}
                <div>
                <div className="">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} setEmblaApi={setEmblaApi}/>
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
                    </div>
                </div>
        </section>
    )
}