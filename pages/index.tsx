import type {NextPage} from 'next'
import Head from 'next/head'
import Vision from "../components/vision";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>AI Created Vision Statement for 2035 - Vaerk Project Pluto</title>
                <meta name="description" content="For us humans sometimes it is hard to imagine the future. Project pluto enables you to get aboard a rocket to 2035 and find your company's sustainable vision!"/>
                <link rel="icon" href="/x.svg"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://project-pluto.vaerk.digital/"/>
                <meta property="og:title" content="AI Created Vision Statement for 2035 - Vaerk Project Pluto"/>
                <meta property="og:description" content=""/>
                <meta property="og:image" content="https://project-pluto.vaerk.digital/bg.jpg"/>
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://project-pluto.vaerk.digital/"/>
                <meta property="twitter:title" content="AI Created Vision Statement for 2035 - Vaerk Project Pluto"/>
                <meta property="twitter:description" content="For us humans sometimes it is hard to imagine the future. Project pluto enables you to get aboard a rocket to 2035 and find your company's sustainable vision!"/>
                <meta property="twitter:image" content="https://project-pluto.vaerk.digital/bg.jpg"/>
            </Head>
            <main>
                <Vision></Vision>
            </main>
        </div>
    )
}

export default Home
