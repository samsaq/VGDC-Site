"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmblaCarousel from "embla-carousel-react";
import { getOfficerData } from "@/lib/actions";
import { DotButton, useDotButton } from "@/components/CarouselDotButton";
import { AnimatedContent } from "@/components/AnimatedContent";
interface Officer {
    title: string;
    content: string;
    coverImage?: string;
    slug?: string;
    [key: string]: unknown;
  }
export default function officers()
{   
    const [officers, setOfficers] = useState<Officer[]>([]);
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
    );
    useEffect(() =>{ 
        async function fetchOfficerData() 
        {   
            try 
            {
                const data = await getOfficerData();
                setOfficers(data);
            }
            catch (error)
            {
                console.error("Error fetch officer data:", error);
            }
            finally
            {
                setLoading(false);
            }
        }
        fetchOfficerData();
    }, []);

    return(
        <section className="overflow-hidden">{/*Page container */}
            <div className="relative h-[350px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                    {loading ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    ) : officers.length === 0 ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>No games available</p>
                        </div>
                                            ) : (
                        officers.map((officer, index) => (
                        <div
                        key={officer.slug || index}
                        className="embla__slide relative flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <div className="flex h-full w-full items-center justify-center px-4">
                                {officer.coverImage ? (
                                    <div className="flex h-[90%] w-[90%] items-center justify-center">
                                        <img
                                            src={officer.coverImage}
                                            alt={officer.title}
                                            className="max-h-full max-w-full object-contain rounded-xl"/>
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