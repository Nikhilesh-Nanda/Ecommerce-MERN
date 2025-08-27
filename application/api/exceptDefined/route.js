import { NextResponse } from "next/server";
//handle all routes except the defined one
export async function GET(){
    return NextResponse.json({message:"Unknown URL"},{status:404})
}