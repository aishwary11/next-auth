import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = NextResponse.json({
			message: "Logout successful",
			success: true
		});
		response.headers.delete('Authorization');
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
