import MiniMyPageContainer from "./components/Main/MiniMyPage/MiniMyPageContainer";
import CardListContainer from "./components/Main/PopularList/CardListContainer";
import RecentContainer from "./components/Main/RecentContainer";

export default function Home() {
    
    return (
        <>
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
