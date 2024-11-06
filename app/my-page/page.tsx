import { getServerSession, Session } from "next-auth"
import MyPage from "./Main/MySubscriptionscontainer";
import UserProfile from "./Main/UserProfile";



interface PropsType {
    params : {id : string};
}
export default async function MyPag(props :PropsType) {

    const session : Session|null = await getServerSession();
   


    //해야하는 것. 유투버의 구독자 정보 즉 프로필 정보를 가져오기
    //구독자 순. 총 조회순으로 정렬하는 버튼 만들기
    return (
        <div className="p-0 container">
            <div className="row w-100" style={{margin : 'auto'}}>
                <div className="col-12">
            <UserProfile session={session}/>
                </div>
            <MyPage />
            </div>
            
        </div>
    );
}