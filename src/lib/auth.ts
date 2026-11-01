import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient("mongodb://cat-ron-user:CROJdczYuL94ogU3@ac-jbofrx0-shard-00-00.sn4gjwj.mongodb.net:27017,ac-jbofrx0-shard-00-01.sn4gjwj.mongodb.net:27017,ac-jbofrx0-shard-00-02.sn4gjwj.mongodb.net:27017/?ssl=true&replicaSet=atlas-dn84g0-shard-0&authSource=admin");
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