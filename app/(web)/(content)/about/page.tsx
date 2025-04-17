"use client";
import { useState, useEffect } from "react";
import { getAboutData } from "@/lib/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface About {
    title: string;
    content: string;
    coverImage?: string;
    [key: string]: unknown;
  }
export default function About()
{
    const [aboutPage, setAboutPage] = useState<About>();
    const [selectedAboutPage, setSelectedAboutPage] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchAbout() {
          const data = await getAboutData();
          setAboutPage(data);
          setLoading(false);
        }
        fetchAbout();
      }, []);
    return(
        <section className="m-0 overflow-y-auto max-h-full px-5"> {/* Page container*/}

            <div>{/*Non-header container*/}
                <div className="flex items-center justify-center py-2">{/* Title Container*/}
                    <h1 className="font-outfit font-bold text-5xl text-red-600"> 
                        {aboutPage?.title}
                    </h1>
                </div>
                <div className="font-outfit font-bold pb-5">{/* Subheader 1 container*/}
                    <h1 className="text-gray-500 text-2xl py-5">

                        {aboutPage?.content.split("\n")
                        .filter(section => section.includes("#"))[0].replaceAll('#', "")}
                    </h1>
                    <p className="text-gray-500 text-xl">
                    {aboutPage?.content.split(/^#{1,3}\s.+$/m)[1]}
                    </p>
                </div> 
                <div className="flex flex-col md:flex-row h-auto"> 
                    {/* Subheader 2 Split container */}
                    <div className="w-full md:w-1/2">
                    {aboutPage?.coverImage && (
                        <img src={aboutPage.coverImage} alt="Cover" 
                        className="rounded-3xl object-fill"/>
                    )}
                      </div>
                    <div className="w-full md:w-1/2 font-outfit font-bold p-5">
                        <h1 className="text-gray-500 text-2xl pb-2"> {/* Reduced padding */}
                        {aboutPage?.content.split("\n")
                        .filter(section => section.includes("#"))[1].replaceAll('#', "")}
                        </h1>
                        <p className="text-gray-500 text-xl">
                         {aboutPage?.content.split(/^#{1,3}\s.+$/m)[2]}
                        </p>
                    </div>
                </div>
                    {/* Wrap the remaining sections in a div with controlled spacing */}
                <div className="space-y-10 py-5">
                    {/* Subheader 3 container */}
                    <div className="font-outfit font-bold relative">
                        <h1 className="text-gray-500 text-2xl pb-2">
                        {aboutPage?.content.split("\n")
                        .filter(section => section.includes("#"))[2].replaceAll('#', "")}
                        </h1>
                        <p className="text-gray-500 text-xl">
                        {aboutPage?.content.split(/^#{1,3}\s.+$/m)[3]}
                        </p>
                    </div>
                    {/* Subheader 4 container */}
                    <div className="font-outfit font-bold">
                        <h1 className="text-gray-500 text-2xl py-4">
                        {aboutPage?.content.split("\n")
                        .filter(section => section.includes("#"))[3].replaceAll('#', "")}
                        </h1>
                        <p className="text-gray-500 text-xl">
                        {aboutPage?.content.split(/^#{1,3}\s.+$/m)[4]}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}