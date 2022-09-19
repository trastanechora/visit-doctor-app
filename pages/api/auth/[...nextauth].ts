import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getDoctorByEmail } from '../../../repository/doctor'
import { setCookie } from 'cookies-next';

const getAuthOptions = (callbacks: NextAuthOptions['callbacks']) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      }),
    ],
    callbacks
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const callbacks: NextAuthOptions['callbacks'] = {
    session({ session }) {
      return session;
    },
    async signIn({ user }) {
      const processedResult = await getDoctorByEmail(user.email!);
      const keys = Object.keys(processedResult);
      if (keys.length === 0) {
        return '/unauthorized'
      } else {
        setCookie('name', processedResult.name, { req, res });
        setCookie('email', processedResult.email, { req, res });
        setCookie('image', user.image, { req, res });
        return true
      }
    },
  }
  return NextAuth(req, res, getAuthOptions(callbacks))
}

export default handler
