import pgPromise, { IEventContext } from 'pg-promise';
import bluebird from 'bluebird';
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL as string;
const initOptions = {
    promiseLib: bluebird,
    error(error: Error, e: IEventContext) {
        console.log(e.query);

        return { ...error, DB_ERROR: true };
    },
};

export const pgp = pgPromise(initOptions as object);
const db = pgp(DB_URL);

export default db;
