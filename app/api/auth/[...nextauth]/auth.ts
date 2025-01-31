import { PrismaClient } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Credenciais inválidas.");
                }

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email },
                });

                if (!admin) {
                    throw new Error("Credenciais inválidas.");
                }

                // Usando Argon2 para verificar a senha
                const isValid = await argon2.verify(admin.password, credentials.password);
                if (!isValid) {
                    throw new Error("Credenciais inválidas.");
                }

                return {
                    id: admin.id.toString(),
                    username: admin.username,
                    email: admin.email,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.name;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};

export { authOptions };
