// pages/api/analyzeEntity.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const config = {
    api: {
        bodyParser: true, // JSON 본문 파싱 활성화
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'POST') {
        try {
            // const { text } = req.body;
            const text = '내 이름은 김동우입니다. 황만기대 김동우 이거 완전 세기의 대결 아니냐 침착맨 개지리노'
            if (!text) {
                return res.status(400).json({ error: '텍스트를 입력해주세요.' });
            }

            const apiKey = process.env.YOUTUBE_API_KEY; // API Key는 환경 변수로 관리
            const url = `https://language.googleapis.com/v1/documents:analyzeSyntax?key=${apiKey}`;
            // const url = `https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`;

            // API 요청 본문 구성
            const document = {
                document: {
                    content: text,
                    type: 'PLAIN_TEXT',
                },
                encodingType: 'UTF8',
            };

            // Google Cloud Natural Language API에 요청
            const response = await axios.post(url, document);
            console.log(response.data);

            // Entity 분석 결과 반환
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error analyzing entity:', error);
            res.status(500).json({ error: 'Entity 분석 중 오류가 발생했습니다.' });
        }
    // } else {
    //     res.status(405).json({ error: 'Method Not Allowed' });
    // }
}
