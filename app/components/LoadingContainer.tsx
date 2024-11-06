import '@/app/css/loading.css';

export default function LoadingContianer(
    { height } : { height:number|string }
){
    return(
        /* From Uiverse.io by S4tyendra */ 
        <div className="loading-wrapper" style={{
            height : height
        }}>
            <div className="loading-container">
                <div className="loading-preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="loading-shadow"></div>
            </div>
        </div>
    )
}