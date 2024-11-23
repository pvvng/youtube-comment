import '@/app/css/landing.css';

import LadingSearchButton from './components/Landing/LandingSearchButton';
import ContentContainer from './components/Landing/Content/ContentContainer';
import GoMainBtn from './components/Landing/Content/GoMainBtn';
import Image from 'next/legacy/image';

export default function Home() {
    
    return (
        <div className='text-center overflow-hidden'>
            <div className='mt-3'>
                <div className='large-logo-container'>
                    <Image
                        src="/logo/logo-full.png"
                        alt="YoutuView LOGO"
                        width={360}
                        height={360}
                        layout='responsive'
                        priority
                    />
                </div>
                <LadingSearchButton />
            </div>
            <GoMainBtn />
            <ContentContainer />
        </div>
    );
}
