import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";

const handler = typeof NextAuth === "function"
    ? NextAuth(authOptions)
    : (async (..._args: unknown[]) => {
        throw new Error("NextAuth handler is not available.");
    });

export { handler as GET, handler as POST };
