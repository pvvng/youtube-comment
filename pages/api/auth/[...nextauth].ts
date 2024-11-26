import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
                    access_type: "offline", // Refresh Token 요청
                    prompt: "consent", // 항상 새 Refresh Token 요청
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ baseUrl }: { baseUrl: string }) {
            return `${baseUrl}/main`; // 로그인 후 /main으로 리디렉션
        },
        async jwt({ token, account }: { token: JWT; account?: any }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token || token.refreshToken; // 기존 값 유지
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },
};

export default NextAuth(authOptions);