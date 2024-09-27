import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "your-google-client-id",
    //   clientSecret: process.env.GOOGLE_SECRET || "your-google-client-secret",
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const users = [
          {
            id: "admin-1",
            name: "Admin",
            email: "admin@test.com",
            password: await bcrypt.hash("password", 10),
            roles: ["admin"],
          },
          {
            id: "user-2",
            name: "User",
            email: "user2@test.com",
            password: await bcrypt.hash("password", 10),
            roles: ["user"],
          },
          {
            id: "user-3",
            name: "User",
            email: "user3@test.com",
            password: await bcrypt.hash("password", 10),
            roles: ["user"],
          },
          {
            id: "user-4",
            name: "User",
            email: "user4@test.com",
            password: await bcrypt.hash("password", 10),
            roles: ["user"],
          },
        ]

        if (!credentials) {
          return null
        }

        const user = users.find((user) => user.email === credentials.email)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  adapter: UpstashRedisAdapter(redis),
  secret: process.env.NEXTAUTH_SECRET || "wNjPYo0gn36UDjqEYTFVE6vqkRNyLn6W1ZGFLyigxs4=",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "wNjPYo0gn36UDjqEYTFVE6vqkRNyLn6W1ZGFLyigxs4=",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id
      }
      return session
    },
  },
})
