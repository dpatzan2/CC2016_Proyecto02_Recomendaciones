
import connectionDB from '@/db/connect';
import type { NextApiRequest, NextApiResponse } from 'next';


export const getAllGenders = async () => {
    try {
        const driver = await connectionDB();
        const session = driver.session();
        const result = await session.run(
            `MATCH (u:Genders) RETURN u`
        );
        console.log(result)
        session.close();
        return result.records.map(( record: any ) =>  { return {...record.toObject().u.properties, id: record.toObject().u.identity.toNumber()}});
    } catch (error) {
       console.log(error)
    }
}