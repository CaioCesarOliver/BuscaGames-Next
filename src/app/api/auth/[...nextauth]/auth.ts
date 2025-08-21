import type { NextAuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      role: string;
    } & DefaultSession["user"]
  }
}

// Extend the built-in user type
declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        tokenizedUID: { label: "Tokenized UID", type: "text" },
        userDetails: { label: "User Details", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.tokenizedUID || !credentials?.userDetails) {
          return null;
        }

        try {
          const userDetails = JSON.parse(credentials.userDetails);
          return {
            id: credentials.tokenizedUID,
            ...userDetails
          };
        } catch (error) {
          console.error("Error parsing user details:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.userName = user.userName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          userName: token.userName as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET
};