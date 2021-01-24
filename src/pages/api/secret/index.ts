import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (session) {
        res.status(200).json({
            content: 'Welcome to the super secret api response',
        });
    } else {
        res.status(401).json({
            content: `You're are not allowed to be here, get out, sign in and come back`,
        });
    }
};
