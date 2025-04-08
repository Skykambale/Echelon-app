import { MongoClient, MongoClientOptions } from "mongodb";

// Extend the global object to include _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable so the client is not recreated during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "echelon");

  return { client, db };
}
