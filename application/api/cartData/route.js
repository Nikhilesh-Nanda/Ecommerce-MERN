import { NextResponse } from "next/server";
import { dbConnection } from "../../../../dbConnection";
const allCartData = [];
const collectionName = "cartDetails";
//route for cart data
export async function GET() {
  try {
    //try-catch block for error handling
    const db = await dbConnection(); //connect to DB
    const collection = db.collection(collectionName);

    console.log("Whole Cart Details");
    console.log(allCartData); //print all the data till now

    const ins = await collection.insertMany(allCartData); //insert all at once
    return NextResponse.json(
      { message: "Data Sent To Backend" },
      { status: 200 }
    ); //return appr. response
  } catch (err) {
    //error caught in catch block
    console.log("ERROR OCCURED DURING FETCHING", err); //print the error
    return NextResponse.json({ message: "ERROR" }, { status: 404 }); //return appr. response
  }
}
export async function DELETE(req) {
  //try-catch block for error handling
  try {
    const db = await dbConnection();//connect
    const collection = db.collection(collectionName);

    const response = await req.json();
    console.log("Data with name to delete");
    console.log(response);

    await collection.deleteOne(response.data);//delete one record with the name
    
    return NextResponse.json(
      { message: "DATA DELETED FROM DB" },
      { status: 200 }
    ); //return appr.response
  } catch (err) {
    //error caught in catch block
    console.log("ERROR DURING DELETION IN DB", err); //print the error
    return NextResponse.json({ message: "ERROR" }, { status: 404 }); //return appr. response
  }
}
export async function POST(req) {
  try {
    //try-catch block for error handling
    const db = await dbConnection();
    const collection = db.collection(collectionName);

    const d = await req.json();
    console.log("SINGLE DATA CART HERE");
    console.log(d);
    allCartData.push(d); //add where whole data is stored

    await collection.insertOne(d);//add one at a time

    return NextResponse.json({ message: "Data Received" }, { status: 200 }); //return appr. response
  } catch (err) {
    //error caught in catch block
    console.log("ERROR OCCURED DURING FETCHING", err); //print the error
    return NextResponse.json({ message: "ERROR" }, { status: 404 }); //return appr. response
  }
}
