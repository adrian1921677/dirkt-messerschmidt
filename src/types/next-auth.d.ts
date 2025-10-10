// NextAuth type definitions

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: "ADMIN" | "VIEWER"
      email?: string
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    id?: string
    role?: "ADMIN" | "VIEWER"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "VIEWER"
  }
}
