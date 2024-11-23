export default function ErrorContainer(
    {errorMessage} : {errorMessage : string|null}
){
    return(
        <div className="mt-2 w-100 text-center mb-3">
            <img src="/logo/logo-mask.png" width="50%" style={{maxWidth : 360}} />
            <p className="m-0 fw-bold mt-3">
                {errorMessage} 
                <br className="m-0" />
               
            </p>
        </div>
    )
}