import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(
  process.env.BETTER_AUTH_DB_URL as string
);

const db = client.db("grocery-better-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },
});



// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
// const db = client.db("grocery-better-auth");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
//     },
//   },

//   database: mongodbAdapter(db, {
//     client,
//   }),
// });
// // account.accountLinking.trustedProviders