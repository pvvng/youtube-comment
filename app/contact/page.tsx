import '@/app/css/contact-form.css';

import NavbarContainer from "../components/Navbar/NavbarContainer";
import FormContainer from './components/FormContainer';

export default function ContactPage() {
    return (
        <>
            <NavbarContainer />
            <div className='w-100 container p-2'>
                <FormContainer />
            </div>
        </>
    )
}