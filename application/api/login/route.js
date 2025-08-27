import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { dbConnection } from "../../../../dbConnection";
import jwt from "jsonwebtoken";
const collectionName = "userDetails";

export async function GET(){
    return NextResponse.json({message:"Welcome To The Login Route"},{status:200});
}
// POST: Handle login
export async function POST(req) {
  console.log("API LOGIN HIT");
  try {
    const db = await dbConnection(); // connect to database
    const collection = db.collection(collectionName);

    const dataReceived = await req.json();
    console.log("Data Received from frontend:", dataReceived);
    //destruct the upcoming request data
    const { userID, password } = dataReceived;

    // Make sure field matches what you stored during signup
    const user = await collection.findOne({ userId: userID });
    if (!user) {
      return NextResponse.json(
        { flag: 0, message: "User Not Found" },
        { status: 404 } // Use 200 so frontend can handle in try block
      );
    }

    // Compare password (adjust field name if you stored under passOfUser)
    const isMatch = await bcrypt.compare(password, user.pass);
    if (!isMatch) {
      return NextResponse.json(
        { flag: 0, message: "Password Does Not Match" },
        { status: 404 } // same reason as above
      );
    }

    //create jwt
    const payload = {userId:user._id};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
    // Successful login
    return NextResponse.json(
      { tokenA:token,flag: 1, message: "Login Success" },
      { status: 200 }
    );
    //catch block to handle the errors
  } catch (err) {
    console.error("ERROR OCCURRED DURING LOGIN:", err);
    return NextResponse.json(
      { flag: 0, message: "Server Error" },
      { status: 500 }//return appr. response
    );
  }
}
