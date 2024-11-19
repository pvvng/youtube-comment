import CardListContainer from "./components/Popularlist/CardListContainer";
import RecentContainer from "./components/Recent/RecentContainer";
import MiniMyPageContainer from "./components/MiniMyPage/MiniMyPageContainer";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import LoginForm from "./components/CaptchaTest";

export default function Home() {
    
    return (
        <>
            <NavbarContainer />
            <div className="p-sm-3 p-2 row w-100 container-lg" style={{margin : 'auto'}}>
                <div className="col-12 col-md-4 col-lg-3">
                    <MiniMyPageContainer />
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                    <CardListContainer />
                    <RecentContainer />
                </div>
            </div>
        </>
    );
}
