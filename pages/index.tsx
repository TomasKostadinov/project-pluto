import type {NextPage} from 'next'
import Head from 'next/head'
import Vision from "../components/vision";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>Vaerk Project Pluto</title>
                <meta name="description" content="AI created vision"/>
                <link rel="icon" href="/x.svg"/>
            </Head>
            <main>
                <Vision></Vision>
            </main>
        </div>
    )
}

export default Home
