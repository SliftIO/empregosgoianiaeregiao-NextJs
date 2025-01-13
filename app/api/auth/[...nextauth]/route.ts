import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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

        // Busca o Admin no banco
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("Credenciais inválidas.");
        }

        // Verifica a senha com bcrypt
        const isValid = await compare(credentials.password, admin.password);
        if (!isValid) {
          throw new Error("Credenciais inválidas.");
        }

        // Retorna os dados do usuário para o JWT
        return {
          id: admin.id.toString(),
          username: admin.username,
          email: admin.email,
        };
      },
    }),
  ],
  callbacks: {
    // Ajusta o token JWT para incluir dados do usuário
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name;
        token.email = user.email;
      }
      return token;
    },

    // Ajusta a sessão para incluir os dados do usuário
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
    // Personaliza a página de login (opcional)
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Define explicitamente como JWT
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };