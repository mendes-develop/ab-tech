import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.cookies.get('access')) {
    return NextResponse.next()
  }
  return Response.redirect(new URL('/signup', request.url))
}

export const config = {
  matcher: '/',
}
