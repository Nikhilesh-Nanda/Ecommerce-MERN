"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Navbar.css";
import axios from "axios";
//random options 
const dropdownOptions = [
  {
    value: "apple",
    label: "Apple Fruit",
    description: "Fresh and crispy apples",
    category: "Fruits",
  },
  {
    value: "banana",
    label: "Banana",
    description: "Sweet yellow bananas rich in potassium",
    category: "Fruits",
  },
  {
    value: "cherry",
    label: "Cherries",
    description: "Juicy red cherries, perfect for desserts",
    category: "Fruits",
  },
  {
    value: "date",
    label: "Dates",
    description: "Natural sweet dates, packed with nutrients",
    category: "Dry Fruits",
  },
  {
    value: "elderberry",
    label: "Elderberry",
    description: "Berries known for their immune-boosting properties",
    category: "Berries",
  },
  {
    value: "fig",
    label: "Fresh Fig",
    description: "Soft and sweet figs, perfect for snacking",
    category: "Fruits",
  },
  {
    value: "grape",
    label: "Grapes",
    description: "Seedless grapes, great for juices and snacks",
    category: "Fruits",
  },
  {
    value: "honeydew",
    label: "Honeydew Melon",
    description: "Sweet and refreshing honeydew melon slices",
    category: "Melons",
  },
];
//random options
const moreButtonOptions = [
  "Preferences",
  "Settings",
  "Report",
  "Want To Sell?"
];
const Navbar = () => {
  //state management
  const [drop, setdrop] = useState(false);
  const [moreSecDrop, setmoreDrop] = useState(false);
  const router = useRouter(); //create instance of useRouter
  const [logOutCheck, setLogOut] = useState(false);
  const [logoClick, setLogoClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogOut, setlogOut] = useState(false);
  
  //functions to handle the clicks on navbar
  function handlePremiumClick() {
    router.push("/getpremium");
  }
  function handleLogoClick() {
    toggleLogoClick();
    router.push("/");
  }
  function handleCartClick() {
    router.push("/mycart");
  }
  function handleOrdersClick() {
    router.push("/myOrders");
  }
  function handleSupportClick() {
    router.push("/supportPage");
  }
  async function handleLogOut() {
    const flagLogOut = 1;
    toggleLogOut();
    localStorage.removeItem('token');
    router.push("/");
    await axios.post("http://localhost:3000/api/logOut",{flag:flagLogOut});
  }
  function handleHomeClick() {
    router.push("/home");
  }
  const toggleDropDown = () => {
    setdrop(!drop);
  };
  //toggle more button dropdown
  const togglemoredropdown = () => {
    setmoreDrop(!moreSecDrop);
  };
  //toggle logout for the login
  const toggleLogOut = () => {
    setlogOut(!isLogOut);
  };
  //toggle logout click and show popups
  const toggleLogOutClick = async () => {
    await setLogOut(!logOutCheck);
    await router.push("/signIn");
    alert("Successfully Logged Out ✅");
  };
  
  const toggleLogoClick = () => {
    setLogoClick(!logoClick);
  };
  //side effect for logout click
  useEffect(() => {
    if (isLogOut) alert("Are U Sure You Want To Log Out??");
    setlogOut(false);
  }, [isLogOut]);
  //side effect for the logo click
  useEffect(() => {
    if (logoClick) {
      alert("Leave This Page??");
      toggleLogoClick();
    }
  }, [logoClick]);
  //side effect to verify
  useEffect(() => {
    if (logOutCheck) alert("Are U Sure Of The Action??");
  }, [logOutCheck]);
  return (
    <div>
      <nav>
        <a onClick={handleLogoClick} className="homeLogo">
          Shopify.In
        </a>
        <input
          className="navInput"
          type="text"
          placeholder="Search For Electronics,appliances,grocery and many more......"
          onClick={toggleDropDown}
        ></input>

        <button className="nav-support" onClick={handleSupportClick}>
          <b>Support</b>
        </button>
        {/* <button className="nav-cart" onClick={handleCartClick}><b>My Cart</b></button> */}
        <button className="navOrders" onClick={handleOrdersClick}>
          <b>My Orders</b>
        </button>
        <button className="navPremium" onClick={handleHomeClick}>
          <b>Home</b>
        </button>
        <button className="navMore" onClick={togglemoredropdown}>
          <b>More ▼</b>
        </button>
        {drop && (
          <div className="more-drop-down">
            {dropdownOptions.map((item) => {
              return (
                <a href="#" key={item.value} className="search-item">
                  {item.label}
                  <br></br>
                  {item.description}
                  <br></br>Category:{item.category}
                </a>
              );
            })}
          </div>
        )}
        {moreSecDrop && (
          <div className="more-button-drop">
            {moreButtonOptions.map((item) => {
              return (
                <a href="#" key={item} className="more-search-item">
                  {item}
                </a>
              );
            })}
          </div>
        )}
        <button className="navPremium" onClick={handlePremiumClick}>
          <b>Shopify Premium</b>
        </button>
        <button className="navPremium" onClick={handleLogOut}>
          <b>Log Out</b>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
