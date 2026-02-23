/**
 * LoginPage (App Router)
 * TODO:
 * 1) 'use client' 선언
 * 2) next-auth/react에서 signIn import
 * 3) Google 버튼 onClick → signIn('google', { callbackUrl: '/' })
 * 4) Kakao 버튼 onClick → signIn('kakao', { callbackUrl: '/' })
 * 5) (선택) URL query(error) 표시
 */

export default function LoginPage() {
  return (
    <>
      <button>Google 로그인</button>
      <button>KAKAO 로그인</button>
    </>
  );
}
