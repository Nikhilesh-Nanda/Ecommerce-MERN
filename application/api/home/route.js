import { NextResponse } from "next/server";
//home route
export async function GET(){
    return NextResponse.json({message:"Welcome To The Home Page"},{status:201});
}