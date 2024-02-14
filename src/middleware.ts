import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.pathname;

  const isAuthenticated = request.cookies.get('isAuthenticated');
  const userType = request.cookies.get('user_type');

  if (!isAuthenticated && (request.nextUrl.pathname.includes('patient-home') || request.nextUrl.pathname.includes('patient-dashboard'))) {
    return NextResponse.redirect(new URL('/auth/patient/login', request.url))
  } else if (!isAuthenticated && request.nextUrl.pathname.includes('doctor-dashboard')) {
    return NextResponse.redirect(new URL('/auth/healthcare-provider/login', request.url))
  }
  else if (isAuthenticated && request.nextUrl.pathname.includes('auth')) {
    if (userType?.value === 'patient') {
      return NextResponse.redirect(new URL('/patient-home', request.url))
    }
    else if (userType?.value === 'doctor') {
      return NextResponse.redirect(new URL('/doctor-dashboard', request.url))
    }
  }
}