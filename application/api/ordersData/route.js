import { NextResponse } from "next/server";
import { dbConnection } from "../../../../dbConnection";
const allData = []; //to store all the order data
const collectionName = "Orders";

export async function GET() {
  //exception handling using try-catch
  try {
    console.log("ALL ORDERS DATA");
    return NextResponse.json(allData); //send appropriate response
  } catch (err) {
    //error caught in catch block
    console.log(err); //print the error
    return NextResponse.json({ message: "Error occured" }, { status: 404 });
  }
}
export async function DELETE(req){
  try{
    
    const db = await dbConnection();
    const collection = db.collection(collectionName);
    
    const d = await req.json();

    await collection.deleteOne(d.data);

    return NextResponse.json({message:"Data deleted"},{status:200});
  }catch(err){
    console.log("ERROR DURING DELETING",err);
    return NextResponse.json({message:"ERROR"},{status:404});
  }
}
export async function POST(req) {
  //exception handling using try-catch
  try {
    const db = await dbConnection();
    const collection = db.collection(collectionName);

    const data = await req.json(); //data send via route
    console.log("HERE IS THE ORDER");
    console.log(data);

    allData.push(data); //add to the all data array

    await collection.insertOne(data);//add to db one by one

    return NextResponse.json({ message: "Data received" }, { status: 200 }); //send appropriate response
  } catch (err) {
    //error caught in catch block
    console.log(err); //print the error
    return NextResponse.json({ message: "ERROR OCCUREDD" }, { status: 404 });
  }
}
