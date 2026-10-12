import { NextResponse } from "next/server";

export async function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:lang(pt|en|es|fr|uk)", "/:lang(pt|en|es|fr|uk)/:path*"],
};
