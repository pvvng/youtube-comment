import '@/app/css/landing.css';
import LadingSearchButton from './components/Landing/LandingSearchButton';
import ContentContainer from './components/Landing/Content/ContentContainer';
import GoMainBtn from './components/Landing/Content/GoMainBtn';
import Image from 'next/image';

export default function Home() {
    
    return (
        <div className='text-center' style={{overflow : 'hidden'}}>
            <div className='mt-3'>
                <div className='large-logo-container mb-3'>
                    <Image
                        src='/logo/logo-full.png' 
                        width={360}
                        height={360}
                        layout='responsive'
                        alt='YoutuView Logo'
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
