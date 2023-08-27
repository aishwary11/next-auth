import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default function tokenMiddleware(handler: (req: NextRequest, res: NextResponse) => void) {
	return async (req: NextRequest, res: NextResponse) => {
		try {
			const authToken = req.cookies.get("token");
			console.log("...........", authToken);
			if (!authToken) return redirect("/login");
			return handler(req, res);
		} catch (error) {
			console.error("Error:::", error);
		}
	};
}
