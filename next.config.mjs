import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    // 개발 중엔 pwa 비활성화
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // Service Worker 파일이 생성될 위치
    dest: "public", 
});

const nextConfig = {
    reactStrictMode: true,
    webpack(config, { dev, isServer }) {
        if (!dev && !isServer) {
            // 프로덕션 모드에서만 소스 맵을 생성
            config.devtool = 'source-map';
        }
        return config;
    },
};

export default withPWA(nextConfig);