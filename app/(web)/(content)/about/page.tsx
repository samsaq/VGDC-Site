"use client";
import { useState, useEffect } from "react";
import { getAboutData } from "@/lib/actions";
interface About {
    title: string;
    content: string;
    coverImage?: string;
    [key: string]: unknown;
  }
export default function About()
{
    const [aboutPage, setAboutPage] = useState<About>();
    const [selectedAboutPage, setSelectedAboutPage] = useState("");
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
        <section className="margin=0 p-5"> {/* Page container*/}
            <div>{/*Non-header container*/}

                <div className="flex items-center justify-center pt-20 pb-10">{/* Title Container*/}
                    <h1 className="font-outfit font-bold text-4xl text-red-600"> 
                        {aboutPage.title}
                    </h1>
                </div>
                <div className="font-outfit font-bold pb-5">{/* Subheader 1 container*/}
                    <h1 className="text-gray-500 text-2xl py-5">
                        Sub Header 1
                    </h1>
                    <p className="text-gray-500 text-xl">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
                    </p>
                </div> 
                <div className="flex flex-col md:flex-row h-auto"> 
                    {/* Subheader 2 Split container */}
                    <div className="w-full md:w-1/2">
                    {aboutPage.length > 0 && (
                        <img src={aboutPage[0].coverImage} alt="Cover" />
                        )}
                      </div>
                    <div className="w-full md:w-1/2 font-outfit font-bold p-5">
                        <h1 className="text-gray-500 text-2xl pb-2"> {/* Reduced padding */}
                        Sub Header 2
                        </h1>
                        <p className="text-gray-500 text-xl">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
                        </p>
                    </div>
                    </div>

                    {/* Wrap the remaining sections in a div with controlled spacing */}
                    <div className="space-y-10 p-5">
                    {/* Subheader 3 container */}
                    <div className="font-outfit font-bold relative">
                        <h1 className="text-gray-500 text-2xl pb-2">
                        Sub Header 3
                        </h1>
                        <p className="text-gray-500 text-xl">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
                        </p>
                    </div>

                    {/* Subheader 4 container */}
                    <div className="font-outfit font-bold">
                        <h1 className="text-gray-500 text-2xl pb-2">
                        Sub Header 4
                        </h1>
                        <p className="text-gray-500 text-xl pb-5">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
                        </p>
                    </div>
                    </div>

            </div>
        </section>
    )
}