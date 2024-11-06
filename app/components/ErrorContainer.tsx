export default function ErrorContainer(
    {errorMessage} : {errorMessage : string|null}
){
    return(
        <div className="w-100 text-center mb-3">
            <img src="/low-origin-logo.png" width="50%" style={{maxWidth : 360}} />
            <p className="m-0 fw-bold">이런! {errorMessage}</p>
        </div>
    )
}