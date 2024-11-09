import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        authorization: {
            params: {
                // YouTube 구독 목록 읽기 권한
                scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",  
                redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
            }
        }
        })
        // ...add more providers here
    ],
    pages : {
        signIn: "/auth/sign-in",
    },
    secret : process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ baseUrl } : { baseUrl: string }) {
            // /main 루트로 리디렉트
            return `${baseUrl}/main`;
        },
        // idToken = 사용자의 신원 검증에 사용하는 jwt token
        // 당장은 필요없어서 주석처리
        async jwt({ token, account } : { token: JWT, account?: any }) {
            if (account) {
                token.accessToken = account.access_token;
                // token.idToken = account.id_token; // id_token 추가
            }
            return token;
        },
        async session({ session, token } : { session: any, token: JWT }) {
            session.accessToken = token.accessToken;
            // session.idToken = token.idToken; // id_token 추가
            return session;
        },
    },
};
export default NextAuth(authOptions);