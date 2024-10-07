import NextAuth from 'next-auth';

/** Session Type 확장 */
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string; // 필요 없다면 제거해도 됨
  }
}
