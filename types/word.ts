/** 
 * etri 형태소 분석 타입 1 
 * 전체 데이터 구조를 정의
 * */
export interface DataObjectType {
    id: number;
    reserve_str: string;
    text: string;
    morp: MorpType[];        // morp 배열의 요소는 MorpObject 타입
    morp_eval: MorpType[];   // morp_eval 배열의 요소는 MorpObject 타입
    word: any[];        // word 배열의 요소는 WordObject 타입
    NE: any[];                 // NE 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    NE_Link: any[];            // NE_Link 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    chunk: any[];              // chunk 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    dependency: any[];         // dependency 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    phrase_dependency: any[];  // phrase_dependency 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    SRL: any[];                // SRL 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    relation: any[];           // relation 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    SA: any[];                 // SA 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
    ZA: any[];                 // ZA 배열의 요소가 어떤 타입인지 명확하지 않아서 any[]로 설정
}

/** 
 * etri 형태소 분석 타입 2 
 * 분석된 형태소 데이터 타입
 * */
export interface MorpType {
    id: number;
    lemma: string;
    type: string;
    position: number;
    weight: number;
}

export interface ConfidenceType {
    negative: number;
    positive: number;
    neutral: number;
}
  
export interface RawFeelType {
    content: string;
    offset: number;
    length: number;
    sentiment: 'negative' | 'neutral' | 'positive';
    confidence: ConfidenceType;
    highlights: any[]; 
}

export interface OrganizedFeelType {
    content : string;
    sentiment : string;
}
  
export interface AnalyzedCommentData {
    morpData : {
        text: string;
        value: number;
    }[];
    feelData : {
        positive : number;
        negative : number;
        neutral : number;
    };
}