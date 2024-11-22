import Image from "next/image";

export default function FormContainer() {
    return (
        <div className="form-container m-auto mt-3 mb-3">
            <form className="form" method='POST'>
                <div className='text-center'>
                    <Image src='/logo/font-full.png' width={100} height={36} alt="YotuView Logo" priority />
                    <h5 className='mt-2 fw-bold'>요청사항 및 개선사항</h5>
                </div>
                <div className="form-group">
                    <label htmlFor="email">
                        <span className='c-red'>*</span>
                        {' '}이메일
                    </label>
                    <input required name="email" id="email" type="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="textarea">
                        <span className='c-red'>*</span>
                        {' '}메시지
                    </label>
                    <textarea required cols={50} rows={10} id="textarea" name="textarea" maxLength={100} />
                </div>
                <button type="submit" className="btn-main">제출</button>
            </form>
        </div>
    )
}