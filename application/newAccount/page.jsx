"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import axios from "axios";
const Page = () => {
  //state management using useState for inputs
  const [submitDetails, setSubmitDetails] = useState(false);
  const [name, setName] = useState("");
  const [uid, setuid] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [cpasswrd, setcPasswrd] = useState("");
  const [gen, setGen] = useState("");
  const [phoneNO, setPhoneNO] = useState();
  const [aphoneNO, setaPhoneNO] = useState();
  const [send, setSendData] = useState(false);
  const [recFlag, setRecFlag] = useState(0);

  const router = useRouter(); //create instance of useRouter
  //function to handle the submit click
  function handleSubmit(e) {
    e.preventDefault();
    router.push("/signIn");
  }

  //function to send data to the backend route
  async function sendData() {
    //try-catch to handle the error during posting
    try {
      //data to send
      const singleData = {
        userName: name,
        userId: uid,
        pass: passwrd,
        gender: gen,
        phone: phoneNO,
        altPhone: aphoneNO,
      };
      const response = await axios.post(
        "http://localhost:3000/api/signUp",
        singleData
      ); //send the data
      const flagValue = Number(response.data.flag);

      setRecFlag(flagValue);
      setSendData(false); //set to false when not sending

      if (flagValue === 1) alert("Account Successfully Created");
      else if (flagValue === 0) alert("Account Already Exists");
      else alert("Unexpected Server Response");
    } catch (err) {
      if (err.response) {
        // Server responded with status code out of 2xx range
        console.log("Backend Error Response:", err.response.data);
        alert(err.response.data.message || "Server returned an error");
      } else if (err.request) {
        // Request was made but no response received
        console.log("No response received:", err.request);
        alert("No response from server. Please try again later.");
      } else {
        // Some other error setting up request
        console.log("Error:", err.message);
        alert("An unexpected error occurred.");
      }
    }
  }
  //toggle the submit action
  const toggleSubmit = (e) => {
    e.preventDefault(); //prevent Refresh the page
    //if any of the fields are not filled
    if (
      !name ||
      !uid ||
      !passwrd ||
      !cpasswrd ||
      !gen ||
      !phoneNO ||
      !aphoneNO
    ) {
      alert("Please Submit The Required Fields");
      return;
    }

    if (passwrd != cpasswrd) {
      alert("Passwords Do Not Match");
      return;
    }
    setSubmitDetails(true);
    setSendData(true); //set to true
    handleSubmit();
  };
  //pop up message after creation
  useEffect(() => {
    if (submitDetails) {
      alert("Account Created"); //give the popup
      alert("Log In With Your Credentials"); //give the popup
      return;
    }
    setSubmitDetails(false);
  }, [submitDetails]);
  //side effect to handle the data sending
  useEffect(() => {
    //if true, then call the function to send data
    if (send) {
      sendData();
    }
  }, [send]);

  return (
    <div className="parentNewAccount">
      <div className="newAccountSection">
        <title>Shopify | New Account</title>
        <form>
          <h2>
            <i>
              <u>Welcome To Shopify</u>
            </i>
          </h2>
          <h4>
            <i>Please Submit All Your Details Below</i>
          </h4>
          <br></br>
          <label htmlFor="Name">User Name:</label>
          <input
            id="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          ></input>
          <br></br>
          <br></br>

          <label htmlFor="iduser">User ID:</label>
          <input
            id="iduser"
            type="text"
            value={uid}
            onChange={(e) => setuid(e.target.value)}
            placeholder="Enter Your Email Id"
            required
          ></input>

          <br></br>
          <br></br>
          <label htmlFor="phone">Phone No:</label>
          <input
            id="phone"
            type="number"
            value={phoneNO}
            onChange={(e) => setPhoneNO(e.target.value)}
            placeholder="Enter 10 Digit No"
          ></input>

          <br></br>
          <br></br>
          <label htmlFor="altphone">Alternate Phone No:</label>
          <input
            id="altphone"
            value={aphoneNO}
            onChange={(e) => setaPhoneNO(e.target.value)}
            type="number"
            placeholder="Enter 10 Digit No"
          ></input>

          <br></br>
          <br></br>
          <label htmlFor="gen">Gender(M/F):</label>
          <input
            id="gen"
            type="text"
            value={gen}
            onChange={(e) => setGen(e.target.value)}
            placeholder="Enter Your Gender"
          ></input>

          <br></br>
          <br></br>

          <label htmlFor="dob">Date Of Birth:</label>
          <input id="dob" type="date" required></input>

          <br></br>
          <br></br>

          <label htmlFor="pass">Password:</label>
          <input
            id="pass"
            value={passwrd}
            onChange={(e) => setPasswrd(e.target.value)}
            type="password"
            placeholder="Enter Password"
            required
          ></input>

          <br></br>
          <br></br>
          <label htmlFor="passC">Confirm Password:</label>
          <input
            id="passC"
            value={cpasswrd}
            onChange={(e) => setcPasswrd(e.target.value)}
            type="password"
            placeholder="Enter Password"
            required
          ></input>

          <br></br>
          <button onClick={(e) => toggleSubmit(e)} type="submit">
            <b>Submit</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
