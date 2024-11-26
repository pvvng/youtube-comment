// import { refreshAccessToken } from "@/@util/functions/fetch/fetchRefreshAccessToken";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: any) {
    try {
        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID || '',
                client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken as string,
            });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // 1hour
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.error('refreshAccessToken-error', error);
    }
}

export const authOptions: NextAuthOptions = {
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
    session: {
        strategy: 'jwt',
        // Seconds - How long until an idle ses
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/auth/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ baseUrl }) {
            return `${baseUrl}/main`; // 로그인 후 /main으로 리디렉션
        },
        async jwt({ token, account, user }) {
            if (account && user) {
                token.accessToken = account.access_token;
                token.accessTokenExpires = account.expires_at || 0 * 1000;
                // token.accessTokenExpires = Date.now() - 1000; // 이미 만료된 시간 (테스트1)
                token.refreshToken = account.refresh_token || token.refreshToken; // 기존 값 유지
                return token;
            }

            const nowTime = Date.now();
            const accessTokenExpires = token.accessTokenExpires as number;
            const TEN_MINUTES_AGO_IN_MS = 60 * 10 * 1000; // 10분 전
            // const TEN_SECONDS_AGO_IN_MS = 10 * 1000; // 10초 전(테스트2)

            // 만료 10 분전에 토큰을 갱신해준다.
            const shouldRefreshTime = accessTokenExpires - nowTime - TEN_MINUTES_AGO_IN_MS;

            if (shouldRefreshTime > 0) {
                if(process.env.NODE_ENV === "development"){
                    console.log(`access token expires remain : ${Math.floor(shouldRefreshTime / 60000)} minute`);
                }
                return token;
            }

            if(process.env.NODE_ENV === "development"){
                console.log("not enough remain time refresh access token...")
            }

            let newToken = await refreshAccessToken(token);

            return newToken;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            // refresh token 제거
            delete session.refreshToken;

            return session;
        },
    },

    debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);