import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

type ExtendedToken = JWT & {
    _id?: string;
    role?: string;
    token?: string;
};

export type SessionUser = NonNullable<Session["user"]>;

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
                const user = await userLogIn(credentials.email, credentials.password);

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
            const extendedToken = token as ExtendedToken;
            const baseUser: Partial<SessionUser> = session.user ?? {};

            session.user = {
                _id: extendedToken._id ?? baseUser._id ?? "",
                name: extendedToken.name ?? baseUser.name ?? null,
                email: extendedToken.email ?? baseUser.email ?? null,
                image: extendedToken.picture ?? baseUser.image ?? null,
                role: extendedToken.role ?? baseUser.role ?? "",
                token: extendedToken.token ?? baseUser.token ?? ""
            } satisfies SessionUser;

            return session;
        }
    }
};
