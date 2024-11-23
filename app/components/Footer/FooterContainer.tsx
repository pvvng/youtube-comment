import Image from 'next/legacy/image';
import Link from "next/link";

export default function FooterContainer(){
    return (
        <>
            <hr className="m-0" />
            <div className="bg-white container container pt-4 pb-2 text-end" style={{margin : 'auto'}}>
                <div className='mb-3' style={{maxWidth: 140}}>
                    <Link href="/main">
                        <Image 
                            src="/logo/font-full.png" 
                            width={100}
                            height={36}
                            layout="responsive"
                            alt="YotuView LOGO"
                            priority
                        />
                    </Link>
                </div>
                <div id='web-name' className='text-start mx-2'>
                    <h5 className="fw-bold m-0 mb-1">유튜뷰 YoutuView</h5>
                    <p style={{fontSize : 14}}>궁금했던 유튜브 영상, 이제 자유롭게 분석하세요!</p>
                </div>
                <p className='mb-5 text-start mx-2'>
                    <Link href="https://github.com/pvvng/youtube-comment" target='_blank' className='af-tag'>깃허브</Link>
                    {' | '}
                    <Link href="https://github.com/pvvng/youtube-comment/issues" target='_blank' className='af-tag'>이슈 제보</Link>
                    {' | '}
                    <Link href="/contact" className='af-tag'>이거 만든 사람들</Link>
                </p>
                <div id='vision' className='mx-2'>
                    <Link href="/privacy-policy">개인정보 보호 정책(Privacy Policy)</Link>
                    <p>© 2024 뿅망치 컴퍼니. All Rights Reserved.</p>
                    <p className='text-secondary' style={{fontSize : 12}}>
                        This site is protected by reCAPTCHA and the Google
                        {' '}<Link href="https://policies.google.com/privacy">Privacy Policy</Link> 
                        {' '}and
                        {' '}<Link href="https://policies.google.com/terms">Terms of Service</Link> 
                        {' '}apply.
                    </p>
                </div>
            </div>
        </>
    )
}