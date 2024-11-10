export default function ErrorContainer(
    {errorMessage} : {errorMessage : string|null}
){
    return(
        <div className="w-100 text-center mb-3">
            <img src="/logo/logo-mask.png" width="50%" style={{maxWidth : 360}} />
            <p className="m-0 fw-bold mt-3">이런! {errorMessage}</p>
        </div>
    )
}