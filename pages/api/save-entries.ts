import {createClient} from '@supabase/supabase-js'
import {NextApiRequest, NextApiResponse} from "next";
import {sendMail} from "../../functions/functions";

const supabase = createClient(
    'https://xpdxpfibddsikacymawq.supabase.co',
    process.env.SUPABASE_API_KEY || ''
);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        email,
        vision,
        insights,
        companyName,
        industry,
        job,
        name
    } = req.body;
    if (!email || !vision) {
        return res.status(400).json({
            error: "Vision or email empty"
        });
    }

    await sendMail(email, vision);
    const {data, error} = await supabase.from('astronauts')
        .insert([
                {
                    vision,
                    email,
                    insights: !!insights,
                    companyName,
                    industry,
                    job,
                }
            ]
        );

    if (error) {
        return res.status(400).json({
            error: error
        });
    }
    return res.status(200).json(data);
}
