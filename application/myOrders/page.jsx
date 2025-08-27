"use client";
import React, { useState, useEffect } from "react";
import "./myOrders.css";
import Navbar from "../Navbar";
import axios from "axios";

const Page = () => {
  const [receivedData, setReceivedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canc,setCancel] = useState(false);
  //toggle the cancel state
  const toggleCancelOrder = () =>{setCancel(!canc)};
  //fun to remove from frontend and as well as backend
  async function removeOrder(itemToFind) {
    //try-catch block to handle errors
    try{
      toggleCancelOrder();
      await axios.delete("http://localhost:3000/api/ordersData",{data:{name:itemToFind}});
      const updated = [...receivedData];
      // Find index of the first matching item
      const idxOfProduct = updated.findIndex((item) => item.name === itemToFind);
      if (idxOfProduct !== -1) {
        updated.splice(idxOfProduct, 1);  // Remove only one instance
        setReceivedData(updated);
      }         // Updates state with the new array
    }catch(err){
      //error caught in catch block
      console.log("ERROR DURING DELETION",err);
    }
  }
  //side effect to verify
  useEffect(()=>{
    if(canc) alert("Are You Sure You Want To Cancel??");
    setCancel(false);
  },[canc]);
  //fetch using useEffect
  useEffect(() => {
    async function fetchOrderData() {
      try {
        // Typically, fetching order data would use GET
        const response = await axios.get(
          "http://localhost:3000/api/ordersData"
        );
        setReceivedData(response.data); // store fetched orders in state
        setLoading(false);
      } catch (err) {
        console.error("ERROR DURING FETCHING DATA", err);
        setError("Failed to fetch order data");
        setLoading(false);
      }
    }
    fetchOrderData();
  }, []);

  if (loading) return <p className="order-load">Loading orders...</p>; //waiting for the response
  if (error) return <p style={{ color: "red" }}>{error}</p>; //no response received

  return (
    <div>
      <Navbar />
      <title>My Orders</title>
      <h1 className="order-heading">My Orders 🛒</h1>
      {receivedData.length === 0 ? (
        <p className="order-nofound">No orders found</p>
      ) : (
        receivedData.map((item) => (
          <div className="orders-tile">
            <h1 className="order-name">{item.name}</h1>
            <p className="order-b">
              <b>{item.brandP}</b>
            </p>
            <p>
              <b>
                {item.cItem} {item.pItem}
              </b>
            </p>
            <p>
              <b>Delivery Time: </b>
            </p>
            <a className="order-track" href="#">
              Track The Package
            </a>
            <br></br>
            <a className="order-info" href="#">
              More Info
            </a>
            <br></br>
            <button
              className="order-cancel"
              onClick={() => removeOrder(item.name)}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
