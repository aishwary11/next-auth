import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	try {
		const authToken: any = req.cookies.get("token")?.value;
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		if (!authToken) return NextResponse.rewrite(new URL("/login", req.url));
		return NextResponse.next();
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.error();
	}
}
