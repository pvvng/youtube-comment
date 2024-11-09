import 'animate.css';
import '@/app/css//landing/landingInput.css';
import '@/app/css//landing/landingLetter.css';
import '@/app/css//landing/landingGoMainBtn.css';
import LadingSearchButton from './components/Landing/LandingSearchButton';
import ContentContainer from './components/Landing/Content/ContentContainer';
import GoMainBtn from './components/Landing/Content/GoMainBtn';

export default function Home() {
    
    return (
        <div className='text-center' style={{overflow : 'hidden'}}>
            <div className='mt-3 animate__animated animate__fadeIn'>
                <img 
                    src='logo/logo-full.png' 
                    width="80%" 
                    alt='YoutuView LOGO' 
                    style={{maxWidth : 368}}
                />
                <LadingSearchButton />
            </div>
            <GoMainBtn />
            <ContentContainer />
        </div>
    );
}
