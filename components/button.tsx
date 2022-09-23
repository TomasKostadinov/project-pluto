export default function Button(props: { title: string; type: 'submit' | 'reset' | 'button' | undefined; }) {
    return (
        <button type={props.type}
                className="inline-flex items-center rounded-md border-0 border-transparent
                bg-gradient-to-r from-[#f58f75] to-[#5b92a6] transition duration-200
                px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-75 focus:outline-none focus:ring-0">
            {props.title}
        </button>
    )
}
