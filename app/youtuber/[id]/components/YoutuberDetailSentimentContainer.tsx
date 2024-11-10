import ErrorContainer from "@/app/components/Error/ErrorContainer";
import FeelGraphContainer from "@/app/video/[id]/components/Analyzed/FeelGraphContainer";
import { SentimentType } from "@/types/word";

interface PropsType {
    sentiment : SentimentType | null;
    youtuberName : string;
}

export default function YoutuberDetailSentimentContainer(
    {sentiment, youtuberName} : PropsType
){
    if(!sentiment) return <ErrorContainer errorMessage="분석된 데이터가 존재하지 않습니다." />

    return <FeelGraphContainer feelData={sentiment} type={youtuberName} />;
}