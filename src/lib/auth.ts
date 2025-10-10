import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { id: true, role: true, email: true, name: true }
        })
        
        if (user) {
          session.user.id = user.id
          session.user.role = user.role
        }
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
  session: {
    strategy: "jwt",
  },
}
