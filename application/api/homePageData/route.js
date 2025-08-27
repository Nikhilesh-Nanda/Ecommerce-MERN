import { NextResponse } from "next/server";
import { dbConnection } from "../../../../dbConnection";
const collectionName = "homeData";
export async function GET(){
    return NextResponse.json({message:"Welcome To The Home Page Data Route"},{status:200});
}
export async function POST(req) {
  //try-catch block to handle error
  try {
    const db = await dbConnection(); //connect to db
    const collection = db.collection(collectionName);

    const response = await req.json(); //json the req body
    console.log("WHOLE HOME DATA");
    console.log(response); //print the received data

    await collection.insertMany(response); //insert all at once
    return NextResponse.json({ message: "Data Sent" }, { status: 200 }); //send appr. response
  } catch (err) {
    //error caught in catch block
    console.log("ERROR DURING POSTING", err);
    return NextResponse.json({ message: "ERROR" }, { status: 404 });
  }
}
