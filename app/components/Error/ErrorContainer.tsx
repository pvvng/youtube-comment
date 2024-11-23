import Image from 'next/legacy/image';

export default function ErrorContainer(
    {errorMessage} : {errorMessage : string|null}
){
    return(
        <div className="mt-2 w-100 text-center mb-3">
            <div className="large-logo-container">
                <Image 
                    src="/logo/logo-mask.png"
                    width={360}
                    height={280}
                    alt="YoutuView Mask LOGO"
                    layout="responsive"
                    priority
                />
            </div>
            <p className="m-0 fw-bold mt-3">{errorMessage}</p>
        </div>
    )
}