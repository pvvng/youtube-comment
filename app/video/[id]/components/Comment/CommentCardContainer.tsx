import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FilteredCommentType } from "@/types/comment";
import dateToString from "@/@util/functions/dateToString";

export function CommentCardContainer(
    { cd, videoId }: { cd: FilteredCommentType, videoId: string }
) {
    // 줄바꿈 단어 존재 시 단어 분리
    let textArr: string[] = [...cd.text.split('\n')];
    const timestampRegex = /(\d{1,2}):(\d{2})/g;

    // jsx 반환 함수
    /** 타임 스탬프를 a태그로 변경하여 jsx로 반환하는 함수 */
    function convertTextWithTimestamps (text: string) {
        return text.split(' ').map((word, i) => {
            const match = word.match(timestampRegex);
            if (match) {
                const [minutes, seconds] = match[0].split(':');
                const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}&t=${timeInSeconds}s`;

                // 타임스탬프를 클릭 가능한 a 태그로 변환
                return (
                    <a
                        key={i}
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration: 'none' }}
                    >
                        {match[0]}
                    </a>
                );
            }

            // 일반 텍스트는 span으로 렌더링
            return <span key={i} style={{ overflowWrap: 'break-word' }}> {word} </span>;
        });
    };

    return (
        <div className="card-container p-2 mb-2">
            <div className="row row-center w-100" style={{ margin: 'auto' }}>
                <div className="col-12 col-sm-2 col-lg-1">
                    <img
                        src={cd.autohorProfileImageUrl}
                        width="100%"
                        alt={cd.authorDisplayName}
                        style={{ borderRadius: '50%', maxWidth: '50px' }}
                    />
                    <p className="m-sm-0 fw-bold d-sm-none text-start">
                        {cd.authorDisplayName}
                    </p>
                </div>
                <div className="col-12 col-sm-10 col-lg-11">
                    <div className="row row-center w-100" style={{ margin: 'auto' }}>
                        <div className="col-12 col-lg-8 px-sm-2 px-0">
                            <p className="m-sm-0 fw-bold d-sm-block d-none">{cd.authorDisplayName}</p>
                            {
                                textArr.map((line, index) => (
                                    <p className="m-sm-0" key={index}>
                                        {convertTextWithTimestamps(line)}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="col-12 col-lg-4 px-sm-2 px-0 text-sm-start text-end">
                            <p className="m-0">{dateToString(cd.publishedAt)}</p>
                            <p className="m-0">
                                <span style={{color : '#ff0000'}}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                                {' '}{cd.likeCount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}