import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export const disconnectFromDatabase = async () => {
    try {
        await client.close();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        throw error;
    }
};
