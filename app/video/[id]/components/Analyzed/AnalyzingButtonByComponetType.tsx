import useReCaptchaVerify, { CaptchaDataType } from "@/@util/hooks/useReCaptchaVerify";
import moment from "moment-timezone";
import { Dispatch, SetStateAction } from "react";

interface CommentTypePropsType {
    type : string|undefined;
    setQueryKeyState : Dispatch<SetStateAction<string | boolean>>;
    setIsBot : Dispatch<SetStateAction<boolean>>;
}

export default function AnalyzingButtonByComponetType(
    {type, setQueryKeyState, setIsBot} : CommentTypePropsType
){
    const koreaTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    const daysDifference = moment(koreaTime).diff(moment(type), 'days');

    const { getReCaptchaToken } = useReCaptchaVerify();

    /** 봇인지 검증하고 상태 변경하는 함수 */
    async function checkBot(){

        // 일단 봇이라 치고
        setIsBot(true);
        let verifyData : CaptchaDataType = await getReCaptchaToken();

        // 서버에서 뭐든 받으면 사람으로 간주
        setIsBot(false);

        // 근데 봇이면 서버 실행은 못함
        if(verifyData.success) {
            setQueryKeyState(true);
        }
    }

    if(type === undefined){
        return (
            <>
                <p className="fw-bold">아직 아무도 분석하지 않은 영상이에요!</p>
                <button 
                    className="btn btn-dark" 
                    onClick={async () => await checkBot()}
                >영상 분석하기</button>
            </>
        )
    }else if(typeof type === "string"){

        const [saveYear, saveMonth, saveDay] = type.split('-');

        return (
            <>
                <p className="fw-bold m-0">
                    {`${saveYear}년 ${saveMonth}월 ${saveDay}일`}에 분석된 영상입니다.
                </p>
                {
                    daysDifference >= 7 ?
                    <button                     
                        className="btn btn-dark" 
                        onClick={async () => await checkBot()}
                    >따끈따끈한 데이터로 변경하기</button>:
                    <p className="m-0">일주일 이내에 분석된 데이터에요.</p>
                }
            </>
        )
    }else{
        return <p className="m-0 fw-bold">잘못된 접근입니다.</p>
    }
}