import { connectToDatabase } from '../../lib/connectToDatabase';

export default async function handler(req, res) {
    try {
        const { mongoClient } = await connectToDatabase();
        const db = mongoClient.db("highscores");
        const collection = db.collection("highscores"); // Connect to highscores database
        const sendArray = req.body.split("#");
        const sendObject = {name:sendArray[0],score:sendArray[1]}
        const results = await collection.insertOne(sendObject) // Insert new object to the database
        res.statusCode = 200;
        console.log(`Successfully inserted item with _id: ${results.insertedId}`)
        res.end()
    } catch (e) {
        console.log(`Failed to insert item: ${e}`)
        res.status(500).json(e);
    }
}