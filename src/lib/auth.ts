import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('cat-ron');

export const auth = betterAuth({
    emailAndPassword:{
        enabled:true
    },
    socialProviders:{
        google:{
            clientId: '',
            clientSecret: ''
        }
    },
  database: mongodbAdapter(db, {
    client,
  }),
});