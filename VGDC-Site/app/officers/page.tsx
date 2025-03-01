import { Navbar } from "@/components/navbar";
import Image from 'next/image';
export default function officers()
{   
    return(
        <div>{/*Page container */}
             <Navbar/>
             <div>{/*Non navbar container*/}
                <div>
                    <div className="w-3/5 overflow-hidden">{/*Image container slider container*/}
                        <img
                        src="filler_image.jpg"
                        className="w-80 h-80 object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-1/10 flex justify-center py-10">{/*select line container*/}
                        <div className="h-[4px] w-[150px] bg-orange-400"></div>
                    </div>
                    <div className="w-3/10 font-outfit flex">{/*triple split container*/}
                        <div className="w-1/3 text-orange-400">{/*caption header */}
                            <h1 className="text-5xl">Meet our club officers</h1>
                        </div>
                        <div className="w-1/3">
                            <div>
                                <strong className="text-xl text-gray-500">Name &emsp; Major: </strong>
                            </div>
                            <h1>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat gravida malesuada quam commodo id integer nam.
                            </h1>
                        </div>
                        <div className="w-1/3 flex justify-start space-x-2">
                            <button className="bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl">
                                <span>&lt;</span>
                            </button>
                            <button className="bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl">
                                <span className="text-light"> &gt; </span>
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
   
}