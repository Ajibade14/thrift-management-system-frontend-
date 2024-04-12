import Image from "next/image"
export default function HeroSection(){
    return(
        <div className=" md:grid grid-cols-2 mx-4 md:mx-6  mt-8">
            <div className="md:ml-8 md:mt-[20%]">
                <p className="text-gray-400">Save. Grow. Earn</p>
                <p className="text-white font-bold text-3xl md:text-5xl">
                    Empowering <span className="text-ajo_orange">SME’s</span> & individuals cultivate healthy savings habits.
                </p>
                <div className="my-8">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join the community</button>
                </div>
            </div>

            <div className="">
            <Image
                alt="hero"
                src="/heroImage.svg"
                width={700}
                height={500}
                // layout="responsive" // Use layout="responsive" for responsive images
                // fill="true"
                // style={{ width: "100%", height: "100%" }} // Set width and height to 100%
            />
            </div>
        </div>
    )
}