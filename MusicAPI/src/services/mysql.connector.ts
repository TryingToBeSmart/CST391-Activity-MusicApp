import { createPool, Pool } from "mysql";

// /*
// Below gives pool two possible data types: Pool and null. 
// In JavaScript, 'null' is both a value and a datatype. 
// TypeScript will not allow a value to be set to null unless 
// it has a null type. Since we want pool to be something 
// other than 'null' we give it two datatypes: Pool | null. 
// 'pool' is initially null and set to a Pool object on line 15. 
// You can see here the use of the environment variables we 
// set up in the earlier section.
// */
let pool: Pool | null = null;

const initializeMySqlConnector = () => {
    try {

        console.log(`MY_SQL_DB_HOST:${process.env.MY_SQL_DB_HOST}`);  // 127.0.0.1
        console.log(`MY_SQL_DB_USER:${process.env.MY_SQL_DB_USER}`);  // root
        console.log(`MY_SQL_DB_PASSWORD:${process.env.MY_SQL_DB_PASSWORD}`);  // root
        console.log(`MY_SQL_DB_PORT:${process.env.MY_SQL_DB_PORT}`);  // 3306
        console.log(`MY_SQL_DB_DATABASE:${process.env.MY_SQL_DB_DATABASE}`);  // music
        console.log(`MY_SQL_DB_CONNECTION_LIMIT:${process.env.MY_SQL_DB_CONNECTION_LIMIT}`);  // 10

        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE,
        });

        console.debug('MySql Adapter Pool generated successfully');
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if (err) {
                console.log('error MySql failed to connect');
                throw new Error('not able to connect to database');
            } else {
                console.log('connection made');
                connection.release();
            }
        })
    } catch (error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
        throw new Error('failed to initialize pool');
    }
}

// /*
// Execute the connection; a generic method, able to return any type <T>. 
// All SQL requests will be executed with this method at the core.
// Params: allowing a string array or an Object as a parameter.
// Returns a Promise of generic type
// According to MDN Web Docs, "The Promise object represents the eventual 
// completion (or failure) of an asynchronous operation and its resulting value." 
// What that means here is that 'execute' will return to the caller immediately 
// with a 'Promise' object. Meanwhile, the actual operation, the SQL query, has 
// not completed yet. The promise means "this will be finished, eventually." 
// This changes a blocking operation into a non-blocking operation. When the 
// query successfully completes the anonymous callback function on line 73 is 
// invoked with 'results' set but 'error' undefined. The Promise then invokes 
// 'resolve' with the results object. On failure, 'error' is defined, and the 
// Promise invokes 'reject' with the error object. Either way, via reject or 
// resolve, the caller has the response it needs. 
// */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) {
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};
