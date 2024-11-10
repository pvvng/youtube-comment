import ErrorContainer from "@/app/components/Error/ErrorContainer";
import KeywordListContainer from "@/app/video/[id]/components/Analyzed/Word/KeywordListContainer";
import WordCloudContainer from "@/app/video/[id]/components/Analyzed/Word/WordCloudContainer";
import { PosType } from "@/types/word";

interface PropsType {
    keyword : PosType[] | null; 
    youtuberName : string;
}

export default function YoutuberDetailKeywordContainer(
    {keyword, youtuberName} : PropsType
){

    if(!keyword) return <ErrorContainer errorMessage="분석된 데이터가 존재하지 않습니다." />
    
    return (
        <div id="keyword" className='card-container mt-3 mb-3' >
            <p className='fw-bold'>{`${youtuberName} 채널 키워드 분석`}</p>
            <div className="w-100 row row-center" style={{margin : 'auto'}}>
                {
                    keyword ?
                    <>
                        <div className="col-12 col-lg-6">
                            <WordCloudContainer keyWordData={keyword} />
                        </div>
                        <div className="col-12 col-lg-6">
                            <KeywordListContainer keywordData={keyword} />
                        </div>   
                    </>: null
                }
            </div>
        </div>
    )
    
}