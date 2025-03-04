import '@/app/css/contact.css';

import NavbarContainer from "../components/Navbar/NavbarContainer";
import FormContainer from './components/FormContainer';
import OurProfile from './components/OurProfile';
import { josData, kimsData } from '@/@util/developerProfileData';
import FooterContainer from '../components/Footer/FooterContainer';

export default function ContactPage() {
    return (
        <>
            <NavbarContainer />
            <div className='w-100 container p-2'>
                <div className='row row-center m-auto mt-5 mb-5'>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <OurProfile {...kimsData} />
                    </div>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <OurProfile {...josData} />
                    </div>
                    <div className='col-12'>
                        <FormContainer />
                    </div>
                </div>
            </div>
            <FooterContainer />
        </>
    )
}