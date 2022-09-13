import Button from "./button";
import VisionModal from "./vision-modal";
import {useState} from "react";
import LoadingModal from "./loading-modal";

export default function Vision() {
    const [visionModalOpen, setVisionModalOpen] = useState<boolean>(false);
    const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
    const [vision, setVision] = useState<string>("");

    const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingModalOpen(true);
        const name = (event.target as any).name.value;
        const form = new FormData(event.target as any)
        const res = await fetch('/api/open-ai', {
            body: JSON.stringify({
                'company-name': form.get('company-name'),
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
        } else {
            alert("An error has occurred, please try again later")
        }
    };

    return (
        <div className="relative bg-white">
            <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
                <div className="py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                    <div className="mx-auto max-w-lg">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Enter your Data here</h2>
                        <p className="mt-3 text-lg leading-6 text-gray-500">
                            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
                            Sapien tortor lacus
                            arcu.
                        </p>
                    </div>
                </div>
                <div className="py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <form onSubmit={submitContact} className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 pb-2">
                                    My Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    autoComplete="name"
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="My Company Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 pb-2">
                                    My Industry
                                </label>
                                <input
                                    id="industry"
                                    name="industry"
                                    type="text"
                                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="My Industry"
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
                                    placeholder="What we currently do"
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
                                    placeholder="These are our main challenges"
                                    defaultValue={''}
                                />
                            </div>
                            <div className="justify-self-end">
                                <Button type="submit" title="Get Vision"></Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <VisionModal text={vision} open={visionModalOpen} setOpen={setVisionModalOpen}></VisionModal>
            <LoadingModal open={loadingModalOpen} setOpen={setLoadingModalOpen}></LoadingModal>
        </div>
    )
}

export interface OpenAiResponse {
    choices: OpenAiChoice[];
}

export interface OpenAiChoice {
    text: string;
}
