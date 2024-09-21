import fs from 'fs/promises';  // fs 모듈의 promises 사용
import formidable, { File } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { cleanUpText } from './wordFunctions/cleanUpText';
import { getAnalyzedWordData } from './wordFunctions/getAnalyzedWordData';
import processAnalyzedData from './wordFunctions/processAnalyzedData';

// bodyParser 비활성화
export const config = {
    api: {
        bodyParser: false,
    },
};

// 파일 파싱을 비동기 함수로 처리
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
    const form = formidable({ multiples: false, keepExtensions: true });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // 1. Formidable을 사용해 파일 파싱
        const { files } = await parseForm(req);
        const uploadedFile = files.file;
        const file = Array.isArray(uploadedFile) ? uploadedFile[0] : (uploadedFile as File | undefined);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // 2. 파일의 내용을 비동기적으로 읽음 (fs.promises.readFile 사용)
        const data = await fs.readFile(file.filepath, 'utf8');

        // 3. 파일의 내용을 클린업하여 반환 및 '/' 단위로 split
        const organizedtextArr = cleanUpText(data).split('/');

        // 4. 댓글 분석 함수 호출
        const { morpResult, feelResult } = await getAnalyzedWordData(organizedtextArr);

        // 5. 데이터 가공 함수 호출
        const { organizedMorpArr, feelCounterObj } = processAnalyzedData(morpResult, feelResult);

        // 6. 응답 반환
        return res.status(200).json({ morpData: organizedMorpArr, feelData: feelCounterObj });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
