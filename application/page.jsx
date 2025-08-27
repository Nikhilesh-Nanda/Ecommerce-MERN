"use client";
import React, { useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

const signInpage = () => {
  //state management using useState
  const [idUser, setiduser] = useState("");
  const [passkey, setpasskey] = useState("");
  const [send, setSendData] = useState(false);

  const router = useRouter(); //create an instance of useRouter
  //function to handle guest mode
  function handleGuestClick() {
    router.push("/home");
  }
  //function to handle sign in click
  function handleSignIN(e) {
    e.preventDefault(); //prevent the refresh
    setSendData(true); //set to true
  }
  //handle the sign Up Click
  function handleNewAc() {
    router.push("/newAccount"); //go to the route
  }
  //function to send data to the route
  async function sendData() {
    try {
      //try-catch block to handle erros
      const singleData = { userID: idUser, password: passkey }; // match backend keys

      const response = await axios.post(
        "http://localhost:3000/api/login",
        singleData
      );

      localStorage.setItem("token", response.data.tokenA); //set the token
      console.log("Login API response:", response.data); // Debug

      const token = localStorage.getItem("token"); //access the token
      if (!token) {
        //if token is not available
        console.log("Token Removed On LogOut");
        return;
      }

      const flagValue = Number(response.data.flag);//receive flag value 

      if (flagValue === 1) {
        // Login successful
        alert(response.data.message || "Login Success");

        router.push("/home");
      } else if (flagValue === 0) {
        // Login failed - show backend message
        alert(response.data.message || "Login failed");
      } else {
        // Unknown flag
        alert("Unexpected response from server");
      }
    } catch (error) {
      //error caught in catch block
      console.error("Error during login request: ", error);

      if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Unexpected error setting up the request
        alert(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setSendData(false); // Stop loading spinner / disable state
    }
  }
  //side effect to get rid of double render
  useEffect(() => {
    //if true,call the sending function
    if (send) {
      sendData();
    }
  }, [send]);

  return (
    <div className="signInSection">
      <title>Shopify | LogIn</title>
      <h1>
        Shopify.In<br></br>
        Many Needs,One Place
      </h1>
      <form>
        <label htmlFor="email">Email ID:</label>
        <br></br>
        <input
          id="email"
          value={idUser}
          onChange={(e) => setiduser(e.target.value)}
          type="text"
          placeholder="Enter Email Id or Phone Number"
          required
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="userPassword">Password:</label>

        <input
          type="password"
          value={passkey}
          onChange={(e) => setpasskey(e.target.value)}
          placeholder="Enter Password"
        ></input>
        <br></br>
        <br></br>
        <button className="oldLogin" onClick={(e) => handleSignIN(e)}>
          <b>Sign In</b>
        </button>

        <button className="guestMode" onClick={handleGuestClick}>
          <b>Use As Guest</b>
        </button>
        <br></br>
        <p>New User??</p>
        <a className="newA" onClick={handleNewAc} href="/newAccount">
          Sign Up
        </a>
        <br></br>
        <br></br>
        <a className="fPass" href="#">
          Forgot Password??
        </a>
        <br></br>
      </form>
    </div>
  );
};

export default signInpage;
