import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        authorization: {
            params: {
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
            async redirect({ url, baseUrl } : { url :string, baseUrl:string}) {
            // 외부 URL 리디렉션을 허용하지 않으려면 이 콜백을 사용자 정의합니다.
            return url.startsWith(baseUrl) ? url : baseUrl
        }
    },
};
export default NextAuth(authOptions);