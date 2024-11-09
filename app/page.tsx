import '@/app/css/landing.css';
import LadingSearchButton from './components/Landing/LandingSearchButton';
import ContentContainer from './components/Landing/Content/ContentContainer';


export default function Home() {
    
    return (
        <div className='text-center' style={{minHeight : '100vh'}}>
            <div className=''>
                <img 
                    src='logo/logo-full.png' 
                    width="80%" 
                    alt='YoutuView LOGO' 
                    style={{maxWidth : 368}}
                />
                <LadingSearchButton />
            </div>
            <ContentContainer />
        </div>
    );
}
