import { NextApiRequest } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate Limiting 설정
export const rateLimiter = new RateLimiterMemory({
    points: 10, // 허용 요청 수
    duration: 60, // 60초 동안 10번 허용
});

// IP 검증 함수 (IPv4 또는 IPv6)
export const isValidIp = (ip: string): boolean => {
    return (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ip
        ) || /^[a-fA-F0-9:]+$/.test(ip) // IPv6 형식 확인
    );
};

// 클라이언트 IP 추출 함수
export const getClientIp = (req: NextApiRequest): string => {
    const forwarded = req.headers['x-forwarded-for'];
    let ip = '';

    if (typeof forwarded === 'string') {
        ip = forwarded.split(',')[0].trim();
    } else if (Array.isArray(forwarded)) {
        ip = forwarded[0].trim();
    } else {
        ip = req.socket.remoteAddress || '';
    }

    return isValidIp(ip) ? ip : '127.0.0.1'; // 유효하지 않은 경우 기본값 반환
};