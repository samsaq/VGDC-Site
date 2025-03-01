import { Navbar } from "@/components/navbar";
export default function officers()
{   
    return(
        <div>{/*Page container */}
             <h1> OFFICERS </h1>
             <div>{/*Non navbar container*/}
                <div>
                    <div>{/*Image container slider container*/}

                    </div>
                    <div>{/*select line container*/}

                    </div>
                    <div className="font-outfit flex">{/*triple split container*/}
                        <div className="w-1/3 text-orange-500">{/*caption header */}
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
                        <div className="w-1/3 flex justify-start space-x-4">
                            <button className="bg-secondary-alternative rounded-full px-8 py-6 text-2xl text-secondary-foreground">
                                <span> &lt; </span>
                            </button>
                            <button className="bg-secondary-alternative rounded-full px-8 py-6 text-2xl text-secondary-foreground">
                                <span className="text-light"> &gt; </span>
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
   
}