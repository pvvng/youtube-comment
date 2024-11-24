import NextAuth from 'next-auth';

/** Session Type 확장 */
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}
