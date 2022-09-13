import Image from "next/image";
import Button from "./button";

export default function Header() {
    return (
        <div className="w-full text-black bg-gray-100 px-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex lg:justify-between lg:px-8 flex space-x-4 items-center">
                <div className="flex-1">
                    <div>
                        <Image src="/vaerk.svg" alt="Vercel Logo" width={64} height={64}/>
                    </div>
                </div>
                <div>
                    <Button type="button" title="Restart"></Button>
                </div>
            </div>
        </div>
    )
}
