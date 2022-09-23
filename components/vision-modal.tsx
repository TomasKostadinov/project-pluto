import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import LoadingModal from "./loading-modal";

export default function VisionModal(props: { text: string, initialPayload: any, open: boolean, setOpen: any }) {
    const cancelButtonRef = useRef(null);
    const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
    const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingModalOpen(true);
        const form = new FormData(event.target as any);
        console.log(props.initialPayload);
        const res = await fetch('/api/save-entries', {
            body: JSON.stringify({
                vision: props.text,
                email: form.get('email'),
                insights: form.get('insights'),
                ...props.initialPayload,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const result = await res.json();
        setLoadingModalOpen(false);
        if (result.error) {
            alert('Error');
            props.setOpen(false);
        } else {
            alert('Your data has been saved');
            props.setOpen(false);
        }
    };

    return (
        <>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>
                    <form onSubmit={submitEmail}>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div className="mt-3 text-left sm:mt-5">
                                                <Dialog.Title as="h3"
                                                              className="text-xl font-medium leading-6 text-gray-900">
                                                    Your AI created Vision and Strategy for 2035 is here!
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-md text-gray-800">
                                                        {props.text}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <h2 className="text-md text-gray-400">
                                                    Send your vision to your email!
                                                </h2>
                                                <label htmlFor="email"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative flex items-start py-4">
                                                <div className="flex h-5 items-center">
                                                    <input
                                                        id="insights"
                                                        aria-describedby="offers-description"
                                                        name="insights"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="insights" className="font-medium text-gray-700">
                                                        Get more insights about vaerk
                                                    </label>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                                >
                                                    Send
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                    onClick={() => props.setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </Transition.Root>
            <LoadingModal open={loadingModalOpen} setOpen={setLoadingModalOpen}></LoadingModal>
        </>
)
}
