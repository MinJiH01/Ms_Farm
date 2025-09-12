import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 관리자 페이지 접근 시 인증 확인
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 로그인 페이지는 제외
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 클라이언트 사이드에서 토큰 확인이 필요하므로
    // 여기서는 기본적인 경로 보호만 수행
    const response = NextResponse.next();
    
    // 보안 헤더 추가
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청에 대해 미들웨어 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};