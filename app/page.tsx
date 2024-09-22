import ListContainer from "./components/Main/ListContainer";
import MiniMyPageContainer from "./components/Main/MiniMyPage/MiniMyPageContainer";

export default function Home() {
  return (
    <div className="row w-100" style={{margin : 'auto'}}>
      <div className="col-12 col-md-4 col-lg-3">
        <MiniMyPageContainer />
      </div>
      <div className="col-12 col-md-8 col-lg-9">
        <ListContainer type={"인기 급상승 동영상"} />
        <ListContainer type={"인기 급상승 유튜버"} />
        <ListContainer type={"최근 확인한 영상"} />
      </div>
    </div>
  );
}
