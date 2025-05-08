"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmblaCarousel from "embla-carousel-react";
import { getOfficerData } from "@/lib/actions";
import { AnimatedContent } from "@/components/AnimatedContent";
import ClassNames from "embla-carousel-class-names";
import whiteLeftArrow from "@/public/whiteLeftArrow.png";
import orangeLeftArrow from "@/public/orangeLeftarrow.png";
interface Officer {
    title: string;
    content: string;
    coverImage?: string;
    slug?: string;
    name: string;
    major: string;
    [key: string]: unknown;
  }
export default function officers()
{   
    const [officers, setOfficers] = useState<Officer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const contentSectionRef = useRef<HTMLDivElement>(null);


    const [emblaRef, emblaApi] = useEmblaCarousel(
    {
        loop: false,
        align: "center",
        containScroll: false,
        dragFree: false, //can use mouse to drag
        slidesToScroll: 1, //How many slides per scroll
    },
    [ClassNames()]
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
    //upon the selected image, reset image carousel to update opacity for select image
    useEffect(() => {
            if (!emblaApi) return;
    
            const onSelect = () => {
                // Force a re-render to update the selected slide's opacity
                setSelectedImage(emblaApi.selectedScrollSnap());
            };
            emblaApi.on("select", onSelect);
    
            return () => {
                emblaApi.off("select", onSelect); // return full-opacity'd image
            };
        }, [emblaApi]);

        const components = {//just in case officers want more nuance in officer info
            h1: ({ ...props }) => (
              <h1
                className="my-4 text-3xl font-bold text-success-alternative"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2 className="my-4 text-2xl font-bold text-gray-500" {...props}/>
            ),
            h3: ({ ...props }) => (
              <h3 className="my-4 text-xl font-semibold text-gray-500" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="mb-4 list-disc space-y-1 pl-5" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="mb-4 list-decimal space-y-1 pl-5" {...props} />
            ),
            p: ({ ...props }) => (
                <p className="mb-4 text-lg text-gray-500" {...props} />
              ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="my-4 border-l-4 border-gray-300 pl-4 italic"
                {...props}
              />
            ),
          };
        
          const renderContent = () => {
            if (loading) {
                return <p className="text-center">Loading officer info...</p>;
            }
            if (officers.length === 0) {
                return <p className="text-center">Officer info not found</p>;
            }
            return (
                <div>
                    <AnimatedContent uniqueKey={officers.slug || selectedImage}>
                        <div className="flex justify-center gap-4 xl-w-full lg-w-[1/2]">
                            <div className="w-1/2 justify-center">
                                <h2 className="text-gray-500 text-center font-bold text-2xl">
                                    Name: {officers[selectedImage].name || ""}
                                </h2>
                            </div>
                            <div className="w-1/2 justify-center">
                                <h2 className="text-gray-500 text-center font-bold text-2xl">
                                    Major: {officers[selectedImage].major || ""}
                                </h2>
                            </div>
                        </div>
                        <div className="overflow-y-scroll 2xl:h-[145px] ">{/*Make only info box scrollable; adjust length of box according to screen width*/}
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={components}>
                                    {officers[selectedImage].content || ""}
                            </ReactMarkdown>
                        </div>
                    </AnimatedContent>
                </div>
            );
        };
    return(
        <section className="">{/*Page container */}
        {/*Carousel */}
            <div className="relative h-3/5 w-full flex">
                <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                    {loading ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>Loading...</p>
                        </div>
                    ) : officers.length === 0 ? (
                        <div className="embla__slide flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center">
                            <p>No Officer Content available</p>
                        </div>
                                            ) : (
                        officers.map((officer, index) => (
                        <div
                        key={officer.slug || index}
                        className={`embla__slide flex flex-grow-0 xl:min-w-[3/4]  ${
                            emblaApi?.selectedScrollSnap() === index ? "opacity-100" : "opacity-50"
                        }`}>
                            <div className=" h-full w-full items-center justify-center px-4 rounded-xl">
                                {officer.coverImage ? (
                                    <div className="flex items-center justify-center h-full w-full">
                                        <img
                                            src={officer.coverImage}
                                            alt={officer.title}
                                            className="h-full w-full object-cover rounded-xl"/>
                                    </div>
                                                    ) : (
                                    <div className="flex h-[70%] w-[70%] items-center justify-center rounded-lg bg-gray-200">
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
            <div className="flex justify-center py-8">{/*select line container*/}
                <div className="h-[4px] w-[150px] bg-orange-400"></div>
                </div>
                <div className="font-outfit 2xl:flex xl:flex lg:flex-row space-x-10 md:space-x-0 justify-center">{/*triple split container*/}
                    <div className="xl:w-1/4 lg:w-full md:w-full md:text-center text-orange-400">{/*caption header */}
                        <h1 className=" font-semibold text-6xl">Meet our club officers</h1>
                    </div>
                    <div className="2xl:w-3/5 xl:w-full px-5">{/*Officer info content */}
                        {renderContent()}
                    </div>
                    {/*Nav Buttons */} 
                    <div className="2xl:w-1/4 xl:w-1/4 lg:w-full md:w-full flex justify-center space-x-4">
                        <button
                            className={`rounded-full w-20 h-20 flex items-center justify-center ${
                                emblaApi?.canScrollPrev() ? "bg-orange-400 hover:bg-orange-500" : "border-opacity-100 cursor-not-allowed"}`}// Use case when end of scrolling left
                                onClick={() => emblaApi?.scrollPrev()} // Tells the carousel to scroll to the left
                        >
                            <Image
                            src={emblaApi?.canScrollPrev() ? whiteLeftArrow : orangeLeftArrow}//change image according to scroll state
                            alt="left Arrow"
                            className="w-1/2"/>
                        </button>
                        <button
                            className={`rounded-full w-20 h-20 flex items-center justify-center 
                                text-white text-4xl- ${
                                emblaApi?.canScrollNext() ? "bg-orange-400 hover:bg-orange-500" : "bg-white border-orange-400 cursor-not-allowed"}`}// Use case when end of scrolling right
                                onClick={() => emblaApi?.scrollNext()} // Tells the carousel to scroll to the left
                        >
                            <Image
                            src={emblaApi?.canScrollNext() ? whiteLeftArrow : orangeLeftArrow}//change image according to scroll state
                            alt="right Arrow"
                            className="w-1/2 scale-x-[-1]"/>{/*Saving resources :b*/}
                        </button>
                    </div>
                </div>{/*End triple split container */}
        </section>
    )
}