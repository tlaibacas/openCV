import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:lang(pt|en|es|fr)", "/:lang(pt|en|es|fr)/:path*"],
};
