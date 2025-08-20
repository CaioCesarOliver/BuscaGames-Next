import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          userName: token.userName,
          role: token.role
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 