import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("Path:", pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:lang(pt|en|es|fr|uk)", "/:lang(pt|en|es|fr|uk)/:path*"],
};
