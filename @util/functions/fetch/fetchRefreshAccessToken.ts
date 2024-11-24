import axios from "axios";

// web url
const nextAuthUrl = process.env.NEXTAUTH_URL;

if (!nextAuthUrl) {
    throw new Error("NEXTAUTH_URL is not defined in the environment variables.");
}

type TokenInfo = {
    accessToken: string | null;
    refreshToken: string | null;
    tokenCreatedAt: number | null;
    expiresIn: number;
};

// token info
export let tokenInfo: TokenInfo = {
    accessToken: null,
    refreshToken: null,
    tokenCreatedAt: null,
    expiresIn: 3600,
};

// 동시 갱신 방지 플래그와 큐
let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

/** Access Token 만료 여부 확인 */
export const isTokenExpired = (): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (!tokenInfo.tokenCreatedAt || !tokenInfo.expiresIn) {
        console.warn("Token expiration check failed: tokenCreatedAt or expiresIn is missing.");
        return true; // 유효성 확인 실패 시 만료로 간주
    }
    return currentTime >= tokenInfo.tokenCreatedAt + tokenInfo.expiresIn;
};

/** Access Token 갱신 */
export const refreshAccessToken = async (): Promise<void> => {
    if (!tokenInfo.refreshToken) {
        throw new Error("Refresh Token is missing. Please log in again.");
    }

    if (isRefreshing) {
        return new Promise<void>((resolve) => {
            refreshQueue.push(resolve);
        });
    }

    isRefreshing = true;

    try {
        const response = await axios.post<{ accessToken: string; expiresIn: number }>(
            `${nextAuthUrl}/api/auth/refresh-token`,
            { refreshToken: tokenInfo.refreshToken },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        tokenInfo.accessToken = response.data.accessToken;
        tokenInfo.tokenCreatedAt = Math.floor(Date.now() / 1000); // 현재 시간 기준
        tokenInfo.expiresIn = response.data.expiresIn; // Refresh API 응답 값 사용

        refreshQueue.forEach((resolve) => resolve());
        refreshQueue = [];
    }  catch (error: any) {
        refreshQueue.forEach((resolve) => resolve());
        refreshQueue = [];

        console.error("Error refreshing access token:", error.response?.data || error.message);

        if (error.response?.status === 401) {
            throw new Error("Unauthorized: Refresh Token is invalid or expired.");
        }
        throw new Error("Failed to refresh access token.");
    } finally {
        isRefreshing = false;
    }
};