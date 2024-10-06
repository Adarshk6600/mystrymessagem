import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials:any):Promise<any> {
        await dbConnect()
        try {
         const user = await UserModel.findOne({
            $or: [
              {email: credentials.identifier},
              {username: credentials.identifier}
           ]
         })
          if (!user) {
            throw new Error('no user found with this email or username')
          }
            if (!user.isVerified) {
              throw new Error('please verify your account before login')
            }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
          if (isPasswordCorrect) {
            return user
          } else {
            throw new Error('please verify your account before log  in')
          }
        
        }
        catch (error: any) {
          throw new Error(error)        
        }
      }
    })
]
}