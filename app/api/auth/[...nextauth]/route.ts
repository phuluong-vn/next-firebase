import { findAdminByEmail } from "@/features/managers/model";
import { LoginSchema } from "@/features/managers/rules";
import { IAdminInput } from "@/features/managers/type";
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

    if(!existAdmin.isActive)
    {
        throw Error("Your account is not active!");
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
                 const result = LoginSchema.safeParse(credentials as IAdminInput);
                if (!result.success) {
                    throw new Error(result.error.issues[0].message);
                }

                const {email, password} = credentials as IAdminInput;
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