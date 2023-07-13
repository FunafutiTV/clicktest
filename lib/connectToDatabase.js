import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // The MongoDB URI is stored as an environment variable
const options = {};

let mongoClient;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local"); // An error is thrown if the environment variable isn't found
}

export async function connectToDatabase() {
    try {
        if (mongoClient) {
            return { mongoClient };
        } // If we are already connected to the Mongo Client, no need to do it again
        mongoClient = await (new MongoClient(uri, options)).connect(); // Connection to the Mongo Client
        console.log("Just connected !");
        return { mongoClient }; 
    } catch (e) {
        console.error(e);
    }
}