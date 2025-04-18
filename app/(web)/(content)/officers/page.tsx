"use client";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useState, useEffect } from "react";
import carouselBs from '@/components/carouselBs'
export default function officers()
{   
    const images = [
        "https://preview.redd.it/uni-the-cat-v0-0e7apdgtg40c1.jpg?width=640&crop=smart&auto=webp&s=a148184e7a6da6518c67322a434d0badc4137b8d",
        "https://preview.redd.it/uni-the-cat-v0-vh7u3egtg40c1.jpg?width=640&crop=smart&auto=webp&s=25a6d3fe7e9ee1e77139660d77e57736188d7fdb",
        "https://preview.redd.it/uni-the-cat-v0-bcqh4egtg40c1.jpg?width=1080&crop=smart&auto=webp&s=15f7e5307db8582cea81239a4f8b70148dd604c6",
        "https://preview.redd.it/uni-the-cat-v0-9ckwsdgtg40c1.jpg?width=1080&crop=smart&auto=webp&s=07ec6059ec16ed946fa9bf99ea89f5e59eccadb2",
        "https://preview.redd.it/uni-the-cat-v0-xzybtdgtg40c1.jpg?width=1080&crop=smart&auto=webp&s=a605955db06a97fdcf507cedc9bb9d2f4cd69dad",
    ]
    const SLIDES = Array.from(images);
  
    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
    
    
    return(
        <section className="m-0 overflow-y-auto max-h-full px-5">
            <div>{/*Non navbar container*/}
                <div>
                <div className="w-full max-w-[800px] h-auto overflow-hidden flex justify-center items-center mx-auto">
                    <EmblaCarousel slides={images} setEmblaApi={setEmblaApi}/>
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
                           
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
   
}