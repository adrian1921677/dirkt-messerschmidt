// Vereinfachte Auth-Konfiguration für den Build
// In Produktion würde hier die vollständige NextAuth-Konfiguration stehen

export const authOptions = {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session }: any) => session,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt: async ({ token }: any) => token,
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
}