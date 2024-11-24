import crypto from 'crypto';

// 환경 변수에서 키와 IV 가져오기
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''; // 32자
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || ''; // 16자

if (ENCRYPTION_KEY.length !== 32 || ENCRYPTION_IV.length !== 16) {
    throw new Error("Invalid ENCRYPTION_KEY or ENCRYPTION_IV length. Key must be 32 chars, IV must be 16 chars.");
}

/** 암호화 함수  */
export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(ENCRYPTION_IV));
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

/** 복호화 함수 */
export const decrypt = (encryptedText: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(ENCRYPTION_IV));
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};