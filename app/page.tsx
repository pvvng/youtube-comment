import MiniMyPageContainer from "./components/Main/MiniMyPage/MiniMyPageContainer";
import CardListContainer from "./components/Main/PopularList/CardListContainer";
import RecentContainer from "./components/Main/RecentContainer";

export default function Home() {
  return (
    <div className="p-0 container">
      <div className="row w-100" style={{margin : 'auto'}}>
        <div className="col-12 col-md-4 col-lg-3">
          <MiniMyPageContainer />
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <CardListContainer />
        </div>
        <div className="col-12">
          <RecentContainer />
        </div>
      </div>
    </div>
  );
}
