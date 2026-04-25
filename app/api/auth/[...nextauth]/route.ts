import { findAdminByEmail } from "@/features/managers/model";
import { loginSchema } from "@/features/managers/rules";
import { ICreateAdminInput } from "@/features/managers/type";
import { comparePassword } from "@/utils/commons/password";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const adminLogin = async (eamil: string, password: string) =>{
    const existAdmin =  await findAdminByEmail(eamil);
    if(!existAdmin)
    {
        throw Error("This email is not exist!");
    }

    const isMatchPassword = await comparePassword(password, existAdmin.password);
    if(!isMatchPassword)
    {
        throw Error("The password is wrong!");
    }

    return {
        email: existAdmin.email,
        id: existAdmin.id
    }
} 

export const authOption: NextAuthOptions = {
    session: {
        strategy:'jwt',
    },
    providers : [
        CredentialsProvider({
             credentials: {},
            async authorize(credentials) {
                console.log(credentials);
                 const result = loginSchema.safeParse(credentials as ICreateAdminInput);
                if (!result.success) {

                    throw new Error(result.error.issues[0].message);
                }

                const {email, password} = credentials as ICreateAdminInput;
                //TODO: implement login logic
                //find admin by email
                //compare password
                return adminLogin(email, password);
            }
        })
    ],
    callbacks:{}
}

const authHandler = NextAuth(authOption);

export {authHandler as GET, authHandler as POST};