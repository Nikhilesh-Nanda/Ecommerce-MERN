import { NextResponse } from "next/server";
//this is logout route
export async function POST(req) {
  try {
    const data = await req.json();
    const { flag } = data;
    console.log("LOG OUT SUCCESS!!!")
    return NextResponse.json({ message: "Log Out Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR" }, { status: 404 });
  }
}
