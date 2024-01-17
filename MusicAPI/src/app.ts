// Importing the necessary modules from Express
import express, { Request, Response } from 'express';
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import dotenv from "dotenv";
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config({ path: "../.env"});
dotenv.config();

// Creating an instance of Express
const app = express();

// Defining the port number
const port = process.env.PORT;

// enable all CORS request
app.use(cors());

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// adding set of security middleware, needs to be installed: npm install helmet
app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

// Application routes
// root route
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the Music API</h1>');
});

// adding router middleware
app.use('/', [albumsRouter, artistsRouter]);

// Making the app listen on the specified port
app.listen(port, () => {
    // Logging a message to the console when the app starts listening
    console.log(`Example app listening at http://localhost:${port}`)
});


// //imports express libraries
// import express, { Request, Response } from 'express';
// import dotenv from "dotenv";
// import albumsRouter from './albums/albums.routes';
// import artistsRouter from './artists/artists.routes';
// import logger from './middleware/logger.middleware';
// import cors from 'cors';
// import helmet from 'helmet';


// dotenv.config();


// //Creates an express app and assigns it to app variable
// const app = express();

// const port = process.env.PORT;

// app.use(cors());

// //Parse JSON bodies
// app.use(express.json());
// //Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));


// app.use(helmet());

// console.log(process.env.MY_SQL_DB_HOST);


// if (process.env.NODE_ENV == 'development') {
//     // add logger middleware
//     app.use(logger);
//     console.log(process.env.GREETING + ' in dev mode');
// }

// app.get('/', (req: Request, res: Response) => {
//     res.send('<h1>Welcome to the Music API<h1/>');
// });


// app.use('/', [albumsRouter, artistsRouter]);

// //This method binds the app with the specified port to listen for any connections.
// app.listen(port, () => {

//     console.log(`Example app listening at http://localhost:${port}`)

// });