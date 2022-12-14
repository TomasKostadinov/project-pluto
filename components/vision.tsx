import Button from "./button";
import VisionModal from "./vision-modal";
import {useState} from "react";
import LoadingModal from "./loading-modal";
import Image from "next/image";
import {useRouter} from 'next/router'

export default function Vision() {
    const [visionModalOpen, setVisionModalOpen] = useState<boolean>(false);
    const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
    const [vision, setVision] = useState<string>("");
    const [initialPayload, setInitialPayload] = useState<{}>({});
    const router = useRouter()
    const {kiosk} = router.query
    const kioskMode = !kiosk;

    const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingModalOpen(true);
        const form = new FormData(event.target as any)
        const res = await fetch('/api/open-ai', {
            body: JSON.stringify({
                companyName: form.get('companyName'),
                industry: form.get('industry'),
                job: form.get('job'),
                message: form.get('message'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const result: OpenAiResponse = await res.json();
        setLoadingModalOpen(false);
        if (result.choices.length >= 1) {
            const answer = result.choices[0].text;
            setVisionModalOpen(true);
            setVision(answer);
            setInitialPayload(result.initialPayload)
        } else {
            alert("An error has occurred, please try again later")
        }
    };

    return (
        <div>
            <main className="lg:flex h-screen">
                <div className="lg:w-1/2 relative">
                    <Image className="absolute inset-0 h-full w-full object-cover" src="/bg.jpg" layout="fill"></Image>
                </div>
                <div className="lg:w-1/2">
                    <div className="mt-10 flex-grow lg:pl-10 text-center lg:text-left">
                        <Image src="/vaerk.svg" width="100" height="80" className="w-32"></Image>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Create your vision for 2035
                        </h2>
                        <p className="mt-5 text-xl text-gray-500">
                            For us humans sometimes it is hard to imagine the future.<br/>
                            This ai provides you an inspiring vision tailored to your company.
                        </p>
                    </div>

                    <div className="py-16 px-4 sm:px-6 lg:col-span-3 lg:py-12 lg:px-8 xl:pl-12">
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <form onSubmit={submitContact} className="grid grid-cols-1 gap-y-6">
                                <div>
                                    <label htmlFor="companyName"
                                           className="block text-sm font-medium text-gray-700 pb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Future Lab vaerk"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 pb-2">
                                        Industry
                                    </label>
                                    <input
                                        id="industry"
                                        name="industry"
                                        type="text"
                                        className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Future research and consulting"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="job" className="block text-sm font-medium text-gray-700 pb-2">
                                        What we currently do
                                    </label>
                                    <input
                                        type="text"
                                        name="job"
                                        id="job"
                                        className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Accompanying organizations towards a sustainable future"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 pb-2">
                                        These are our main challenges
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Explore what sustainability really means"
                                        defaultValue={''}
                                    />
                                </div>
                                <div className="justify-self-start">
                                    <div className="flex space-x-8">
                                        <Button type="submit" title="Get Vision"></Button>
                                        <a className="text-gray-800 py-2 underline cursor-pointer"
                                           onClick={() => window.location.reload()}>Reset</a>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full text-gray-400">
                                    {
                                        !kioskMode
                                            ? <span>A project by vaerk & Tomas Kostadinov.</span>
                                            : <span>A project by <a className="underline cursor-pointer" target="_blank"
                                                   href="https://vaerk.digital/" rel="noreferrer">vaerk</a> & <a className="underline cursor-pointer"
                                                   href="https://tomaskostadinov.com/"  target="_blank" rel="noreferrer">Tomas Kostadinov.</a>
                                            </span>
                                    }
                                    <div>
                                        {
                                            kioskMode &&
                                            <a className="underline cursor-pointer"
                                               href="https://vaerk.digital/imprint/">Imprint</a>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <VisionModal text={vision} initialPayload={initialPayload} open={visionModalOpen}
                         setOpen={setVisionModalOpen}></VisionModal>
            <LoadingModal open={loadingModalOpen} setOpen={setLoadingModalOpen}></LoadingModal>
        </div>
    )
}

export interface OpenAiResponse {
    choices: OpenAiChoice[];
    initialPayload: any;
}

export interface OpenAiChoice {
    text: string;
}
