import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            _id: string;
            role: string;
            token: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        role?: string;
        token?: string;
    }
}
