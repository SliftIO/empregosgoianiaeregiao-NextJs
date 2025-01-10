// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;

  // Se a rota começar com /admin, vamos checar a autenticação
  if (pathname.startsWith("/admin")) {
    // getToken() busca o JWT (via cookies) se estiver logado
    const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });
    // Se não existir token, redireciona para /admin/login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Caso contrário, segue normalmente
  return NextResponse.next();
}

// O matcher define em quais rotas o middleware deve atuar
export const config = {
  matcher: ["/admin/:path*"],
};