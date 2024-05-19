'use server'


import connectionDB from "@/db/connect";
import { User } from "@/types/types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clave_secreta';
export const registerUser = async (user: User): Promise<any> => {
    console.log(user.username + user.password)
    try {
        const driver = await connectionDB();
        const session = driver.session();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await session.run(
            'CREATE (u:User {username: $username, password: $password}) RETURN u',
            { username: user.username, password: hashedPassword }
        );
        session.close();
        return result.records.map((record: any) => ({
            ...record.toObject().u.properties,
            id: record.toObject().u.identity.toNumber(),
        }));
    } catch (error) {
        console.log(error);
        return { error: 'Error registering user' };
    }
};


export const authenticateUser = async (username: string, password: string): Promise<any> => {
    try {
        const driver = await connectionDB();
        const session = driver.session();
        const result = await session.run(
            'MATCH (u:User {username: $username}) RETURN u.password AS password',
            { username }
        );
        session.close();

        if (result.records.length === 0) {
            return { error: 'Invalid username or password' };
        }

        const storedPassword = result.records[0].get('password');
        const isMatch = await bcrypt.compare(password, storedPassword);
        if (!isMatch) {
            return { error: 'Invalid username or password' };
        }

        // Generar un token JWT
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });


        return { token };
    } catch (error) {
        console.log(error);
        return { error: 'Error during authentication' };
    }
};