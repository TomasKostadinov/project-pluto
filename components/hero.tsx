import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:flex space-y-8 lg:px-8">
                <div className="max-w-xs mt-10">
                    <Image src="/x.svg" height="90" width="90"></Image>
                </div>
                <div className="mt-20 flex-grow lg:pl-10">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Your AI created vision
                    </h2>
                    <p className="mt-5 text-xl text-gray-500">
                        Use this tool to find your vision for 2035 using our ai!
                    </p>
                </div>
            </div>
        </div>
    )
}
