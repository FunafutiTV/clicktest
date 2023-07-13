import { connectToDatabase } from '../../lib/connectToDatabase';

export default async function handler(request, response) {
    try {
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db("highscores");
        const collection = db.collection("highscores"); // Connection to the highscores database
        const results = await collection
            .find({})
            .toArray(); // Turn the results into an array
        
        response.status(200).json(results);
    } catch (e) {
        console.error(e);
        response.status(500).json(e);
    }
}