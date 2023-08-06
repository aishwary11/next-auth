import connectDB from "@/app/dbconfig/dbConfig";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request);
		const user = await User.findOne({ _id: userId });
		return NextResponse.json({
			mesaaage: "User retrieved successfully",
			data: user
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
