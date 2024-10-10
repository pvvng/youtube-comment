import { PosType } from "@/types/word";
import WordCloudContainer from "./WordCloudContainer";
import KeywordListContainer from "./KeywordListContainer";

export default function KeywordHubContainer(
    {keyWordData} : {keyWordData : PosType[]}
){
    return (
        <div className='card-container mt-3 mb-3' >
            <p className='fw-bold'>키워드 분석</p>
            <div className="w-100 row row-center" style={{margin : 'auto'}}>
                <div className="col-12 col-lg-6">
                    <WordCloudContainer keyWordData={keyWordData} />
                </div>
                <div className="col-12 col-lg-6">
                    <KeywordListContainer keywordData={keyWordData} />
                </div>
            </div>
    </div>
    )
}