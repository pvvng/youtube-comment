import { DeveloperDataType } from "@/@util/developerProfileData";
import Image from "next/legacy/image";
import Link from "next/link";

export default function OurProfile(props : DeveloperDataType) {

    const {name, email, comment, role, github, profile} = props;

    return (
        <div className="profile-card mt-3 mt-md-0">
            <div className="profile-card-image">
                <div className="m-auto" style={{maxWidth : 280}}>
                    <Image src={profile} width={280} height={280} layout="responsive" alt="YoutuView LOGO" priority />
                </div>
            </div>
            <div className="container">
                <h5 className="profile-card-title m-0 mt-3 fw-bold">
                    {name}
                </h5>
                <p>{email}</p>
                <p className="profile-card-body">
                    {comment}
                </p>
                <div className="profile-footer text-end">
                    {
                        role.map((r, i) => {
                            let classTag: string = 
                                i === role.length - 1 ? 
                                "bg-main c-white px-2 p-1 rounded" : 
                                "bg-main c-white px-2 p-1 rounded mx-2";
                            
                            return <span key={r + i} className={classTag}>{r}</span>
                        })
                    }
                    <div className="mt-3">
                        <Link href={github} className="icon-item">
                            <Image src={"/developer-image/github-icon.png"} width={30} height={30} alt="github" />
                        </Link>{' '}
                    </div>
                </div>
            </div>
        </div>
    )
}