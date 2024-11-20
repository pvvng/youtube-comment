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
    // 이미지 도메인 추가
    images: {
        domains: ['i.ytimg.com', 'yt3.ggpht.com', 'lh3.googleusercontent.com'], 
    },
    webpack(config, { dev, isServer }) {
        if (!dev && !isServer) {
            // 프로덕션 모드에서만 소스 맵을 생성
            config.devtool = 'source-map';
        }
        return config;
    },
};

export default withPWA(nextConfig);