import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let token = request.cookies.get("token");
  // console.log(token);
  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if (request.nextUrl.pathname == "/profile") return NextResponse.next();
  // else return NextResponse.redirect(new URL("/", request.url));
  //   } else if (
  //     request.nextUrl.pathname.startsWith("/profile") ||
  //     request.nextUrl.pathname == "/checkout"
  //   )
  //     return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};
