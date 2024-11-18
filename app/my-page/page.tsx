import { getServerSession, Session } from "next-auth"
import MyPage from "./Main/MySubscriptionscontainer";
import UserProfile from "./Main/UserProfile";
import NavbarContainer from "../components/Navbar/NavbarContainer";

interface PropsType {
    params: { id: string };
}
export default async function MyPag(props: PropsType) {

    const session: Session | null = await getServerSession();
    //해야하는 것. 유투버의 구독자 정보 즉 프로필 정보를 가져오기
    //구독자 순. 총 조회순으로 정렬하는 버튼 만들기
    return (
        <>
            <NavbarContainer />
            <div className="p-2 container">
                <UserProfile session={session} />
                <MyPage />
            </div>
        </>
    );
}