// Simplified auth configuration for now
// This will be implemented when the database is set up
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
}
