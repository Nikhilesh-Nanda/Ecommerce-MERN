import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { dbConnection } from "../../../../dbConnection";
const collectionName = "userDetails";
export async function GET(){
    return NextResponse.json({message:"Welcome To The Sign UP route"},{status:200});
}
export async function POST(req) {
  //try catch block to handle errors
  try {
    const db = await dbConnection();//connect to db
    const collection = db.collection(collectionName);
    //destruct the receiving body
    const { userName, userId, pass, gender, phone, altPhone } = await req.json();

    // Check if user already exists
    const user = await collection.findOne({ userId });
    if (user) {
      return NextResponse.json(
        { flag: 0, message: "Email Already Registered" },
        { status: 400 }
      );
    }
    //if length is less than 6
    if (pass.length < 6) {
      return NextResponse.json(
        { flag: 0, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(pass, 10);//hash the password

    const newData = {
      userId,
      userName,
      pass: hashedPassword,
      gender,
      phone,
      altPhone,
    };
    await collection.insertOne(newData);//insert one by one

    return NextResponse.json(
      { flag: 1, message: "Account Successfully Created" },
      { status: 201 }
    );//return appr. response
  } catch (err) {
    console.log("ERROR OCCURRED DURING FETCHING", err);
    return NextResponse.json(
      { flag: 0, message: "Server Error" },
      { status: 500 }//return appr. response
    );
  }
}
