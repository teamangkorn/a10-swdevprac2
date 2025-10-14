import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Emai", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const user = await userLogin(credentials.email, credentials.password);

                if (user) {
                    return user;
                }
                return null;
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        }
    }
};
