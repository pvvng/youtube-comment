import NextAuth from 'next-auth';
import { JWT } from "next-auth/jwt";

/** Session Type 확장 */
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: string;
  }
}

/** JWT 확장 */
declare module "next-auth/jwt" {
  interface JWT {
      accessToken?: string;
      accessTokenExpiresAt?: number; // Unix timestamp (milliseconds)
      refreshToken?: string; // 명시적으로 추가
      user: Session;
      error?: string;
  }
}
