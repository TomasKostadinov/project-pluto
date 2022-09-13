export default function Button(props: { title: string; type: 'submit' | 'reset' | 'button' | undefined; }) {
    return (
        <button type={props.type}
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            {props.title}
        </button>
    )
}
