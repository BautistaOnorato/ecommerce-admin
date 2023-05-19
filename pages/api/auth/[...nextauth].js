import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/pages/lib/mongodb'
import { useRouter } from 'next/router'

const adminEmails = [
  'bautiono4@gmail.com'
]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token, user }) => {
      if(adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    }
  }
}

export default NextAuth(authOptions)

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  if(!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw 'Not an Admin'
  }
}