import Link from "next/link";
import NavbarContainer from "../components/Navbar/NavbarContainer";

export default function PrivacyPolicyPage(){
    return(
        <>
            <NavbarContainer />
            <div className="container pt-5 pb-5">

                <div id="header" className="mb-4">
                    <h1 className="fw-bold">개인정보 보호 정책</h1>
                    <p className="m-0" style={{color : 'grey', fontSize : 14}}>유튜뷰 YoutuView</p>
                    <p style={{color : 'grey', fontSize : 14}}>최종 수정일 2024년 11월 21일</p>
                </div>
                
                <div id="body">
                    <hr />
                    <h5 className="fw-bold mb-3">1. 수집하는 정보</h5>
                    <p>위 웹사이트는 다음과 같은 데이터를 수집할 수 있습니다.</p>
                    <ul>
                        <li className="fw-bold">Google 계정 정보</li>
                        <ul className="mt-2">
                            <li>사용자가 Google Social Login을 통해 로그인하면, Google로부터 사용자 이름, 이메일 주소, 프로필 사진과 같은 기본 정보만을 수집합니다.</li>
                            <li className="mt-1">이러한 정보는 사용자 인증 및 웹사이트 사용자 경험 개선에 사용됩니다.</li>
                        </ul>
                        <li className="fw-bold mt-2">YouTube 데이터</li>
                        <ul className="mt-2">
                            <li>사용자가 제공하는 YouTube 동영상 ID 또는 채널 정보를 기반으로 댓글 데이터를 분석합니다.</li>
                            <li className="mt-1">YouTube API를 통해 수집된 데이터는 사용자의 요청에 따라 분석 목적으로만 처리되며 저장하지 않습니다.</li>
                        </ul>
                        <li className="fw-bold mt-2">자동으로 수집되는 정보</li>
                        <ul className="mt-2">
                            <li className="fw-bold">Google reCAPTCHA v3:</li>
                            <span className="mt-1">웹사이트는 reCAPTCHA v3를 사용하여 봇 활동을 방지합니다. reCAPTCHA는 사용자의 행동 데이터를 분석하지만, 개인 식별 정보는 수집하지 않습니다.
                            Google reCAPTCHA 사용은 Google <Link href="https://policies.google.com/privacy">개인정보 보호 정책</Link>과 <Link href="https://policies.google.com/terms">서비스 약관</Link>에 따라 처리됩니다.</span>
                            <li className="fw-bold mt-1">Google AdSense:</li>
                            <span>Google 및 타사 광고주는 쿠키를 사용하여 사용자의 이전 방문 기록을 기반으로 맞춤형 광고를 제공합니다.</span>
                        </ul>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">2. 데이터 사용 목적</h5>
                    <p>수집된 데이터는 다음과 같은 목적으로 사용됩니다:</p>
                    <ul>
                        <li className="mt-2">사용자 인증 및 웹사이트 기능 제공</li>
                        <li className="mt-2">YouTube 댓글 분석 결과 제공</li>
                        <li className="mt-2">Google AdSense 광고 제공 및 성능 최적화</li>
                        <li className="mt-2">Google reCAPTCHA를 통한 봇 활동 방지</li>
                        <li className="mt-2">사용자 경험 향상을 위한 통계 데이터 분석</li>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">3. 데이터 저장 및 보호</h5>
                    <ul>
                        <li className="mt-2">Google 로그인 데이터를 저장하지 않으며, 인증은 NextAuth를 통해 안전하게 처리됩니다.</li>
                        <li className="mt-2">YouTube 댓글 데이터는 서버에 저장되지 않으며, 실시간 처리 후 즉시 삭제됩니다.</li>
                        <li className="mt-2">Google reCAPTCHA와 관련된 데이터는 봇 탐지 목적으로 Google에 의해 처리되며, 당사는 이 데이터를 직접 저장하지 않습니다.</li>
                        <li className="mt-2">웹사이트는 HTTPS를 통해 데이터를 암호화하며, 사용자의 개인 정보를 보호하기 위해 업계 표준 보안 조치를 시행하고 있습니다.</li>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">4. 제3자 공유</h5>
                    <ul>
                        <li className="mt-2">Google Social Login 및 YouTube API 사용을 위한 Google과의 데이터 통신</li>
                        <li className="mt-2">Google AdSense 광고를 통한 쿠키 데이터 처리</li>
                        <li className="mt-2">Google reCAPTCHA를 통한 봇 활동 감지 및 분석</li>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">5. Google AdSense, 쿠키 및 reCAPTCHA</h5>
                    <ul>
                        <li className="mt-2 fw-bold">Google AdSense:</li>
                        <span>Google은 쿠키를 사용하여 맞춤형 광고를 제공합니다. 사용자는 브라우저 설정에서 쿠키를 비활성화하거나 Google의 <Link href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings">광고 설정 페이지</Link>에서 관리할 수 있습니다.</span>
                        <li className="mt-2 fw-bold">Google reCAPTCHA:</li>
                        <p className="m-0">reCAPTCHA v3는 봇 활동을 감지하기 위해 Google에서 제공하는 솔루션입니다.</p> 
                        <p className="m-0">reCAPTCHA 사용은 Google <Link href="https://policies.google.com/privacy">개인정보 보호 정책</Link>과 <Link href="https://policies.google.com/terms">서비스 약관</Link>에 따라 처리됩니다.</p>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">6. YouTube API 서비스 사용</h5>
                    <p>위 웹사이트는 YouTube API 서비스를 사용합니다.</p>
                    <p>YouTube 데이터 사용은 YouTube 이용 약관 및 Google 개인정보 보호 정책에 따라 처리됩니다.</p>

                    <hr />
                    <h5 className="fw-bold mb-3">7. 사용자의 권리</h5>
                    <p>사용자는 다음과 같은 권리를 가지고 있습니다:</p>
                    <ul>
                        <li className="mt-2">자신의 데이터 접근 및 삭제 요청</li>
                        <li className="mt-2">데이터 수집 및 처리에 대한 동의 철회</li>
                        <li className="mt-2">사용자의 데이터 관련 요청은 <Link href="/contact">문의 페이지</Link>를 통해 접수받습니다.</li>
                        <li className="mt-2">또는, 아래 소셜 미디어를 통해 연락하실 수 있습니다:</li>
                        <span><Link href="https://github.com/pvvng/youtube-comment">GitHub</Link></span>
                    </ul>

                    <hr />
                    <h5 className="fw-bold mb-3">8. 문의하기</h5>
                    <p>개인정보 보호와 관련하여 문의사항이 있는 경우 <Link href="/contact">문의 페이지</Link>를 통해 접수받습니다</p>
                    <p className="m-0">또는, 아래 소셜 미디어를 통해 연락하실 수 있습니다:</p>
                    <p><Link href="https://github.com/pvvng/youtube-comment">GitHub</Link></p>

                    <hr />
                    <h5 className="fw-bold mb-3">9. 정책 변경</h5>
                    <p>개인정보 보호 정책은 변경될 수 있으며, 중요한 변경 사항은 웹사이트 공지사항을 통해 사용자에게 알릴 것입니다.</p>
                </div>
            </div>
        </>
    )
}