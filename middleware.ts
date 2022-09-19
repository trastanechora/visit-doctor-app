import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/login') {
    console.log('Context', request.cookies)
  }
  console.log('Receiving API call for =========> ', request.nextUrl.pathname)
}

export const config = {
  matcher: ['/api/:path*', '/login'],
}