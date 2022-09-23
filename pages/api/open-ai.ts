// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {job, industry, companyName, name, message} = req.body;


    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt:
            `Please create me a sustainable vision for our future business in 2035 and explain me how to reach this goal, by using the following information as input:
Our company name: ${companyName}
Our industry: ${industry}
What we currently do: ${job}
What are our main challenges: ${message}

AI created vision for 2035 and the strategy to reach it:
[insert]
`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    res.status(200).json({
        ...response.data,
        initialPayload: req.body
    })
}
