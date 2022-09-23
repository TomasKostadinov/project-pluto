import {createClient} from '@supabase/supabase-js'
import {NextApiRequest, NextApiResponse} from "next";

const supabase = createClient(
    'https://xpdxpfibddsikacymawq.supabase.co',
    process.env.SUPABASE_ENV_KEY || ''
);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = req.body;


    const {data, error} = await supabase.from('astronauts')
        .insert([
                {
                    vision: body.vision,
                    email: body.email
                }
            ]
        );

    if (error) {
        return res.status(200).json({
            error: error
        });
    }
    return res.status(200).json(data);
}
