import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;

let cachedClient = null;

export const dbConnect = async (cname) => {
    if (cachedClient) {
        return cachedClient.db(dbname).collection(cname);
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        console.log("Connected Successfully to MongoDB");
        cachedClient = client;
        return client.db(dbname).collection(cname);
    } catch (error) {
        console.error("DETAILED ERROR:", error.message);
        throw error;
    }
}