import Link from "next/link";

export default function OurProfile() {
    return (
        <div className="profile-card mt-3 mt-md-0">
            <div className="profile-card-image text-center">
                <img src="logo/logo-mask.png" width="100%" style={{maxWidth : 360}} />
            </div>
            <div className="container">
                <h5 className="profile-card-title m-0 mt-3 mb-3 fw-bold">김뿅망치</h5>
                <p className="profile-card-body">
                    Nullam ac tristique nulla, at convallis quam. Integer consectetur mi nec magna tristique, non lobortis.
                </p>
                <div className="profile-footer text-end">
                    <span className="bg-main c-white px-2 p-1 rounded mx-2">frontend</span>
                    <span className="bg-main c-white px-2 p-1 rounded">backend</span>
                    <div className="mt-3">
                        <Link href="/contact">깃허브</Link>{' '}
                        <Link href="/contact">블로그</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}