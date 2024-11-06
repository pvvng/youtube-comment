import { Session } from "next-auth";
export default function UserProfile({ session }: { session: Session | null }) {
    console.log('세션값');
    console.log(session);
  return (
    <>
      <div className="container mt-4">
        <div className="">
          <div className="col-auto">
            <img
              src={session?.user?.image || "/temp-user.png"}
              alt="user-profile"
              className="rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="col">
            <h5>{session?.user?.email || "이메일 없음"}</h5>
            <p>이름: {session?.user?.name || "이름 없음"}</p>
            <p>가입일: {"가입일 없음"}</p>
           
          </div>
        </div>
      </div>
    </>
  );
}
