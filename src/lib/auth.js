import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';


const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");
const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  
  // emailVerification:{
  //   sendVerificationEmail: async({user, url}) => {
  //     void resend.emails.send({
  //       from: 'Acme <onboarding@resend.dev>',
  //       to: `redwanhosen4@gmail.com`,
  //       subject: 'Verify your email address',
  //       html: `Click <a href="${url}">here</a> to verify your email.`,
  //     })
  //   },
  //   sendOnSignUp: true,
	// 	autoSignInAfterVerification: true,
	// 	expiresIn: 7*24*3600 // 7 days
  // },
  
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
    github:{
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET
    }
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
