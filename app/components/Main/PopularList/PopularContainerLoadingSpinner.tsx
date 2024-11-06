export default function PopularContainerLoadingSpinner(){
    return(
        <div 
            className="d-flex row-center" 
            style={{minHeight : 100}}
        >
            <div 
                className="spinner-border" 
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
    )
}