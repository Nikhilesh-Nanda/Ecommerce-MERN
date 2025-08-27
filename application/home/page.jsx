"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./page.css";
import axios from "axios";
//random products for the home page
const products = [
  {
    id: "p1001",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Industry-leading noise cancellation, 30-hour battery, touch controls, black.",
    price: 29999,
    currency: "INR",
    category: "Headphones",
    brand: "Sony",
    stock: 34,
    rating: 4.8,
    numReviews: 435,
    images: [
      "https://cdn.example.com/products/sonyxm5-front.jpg",
      "https://cdn.example.com/products/sonyxm5-side.jpg",
    ],
  },
  {
    id: "p1002",
    name: "Apple iPhone 15 Pro Max 256GB, Blue Titanium",
    description:
      "6.7-inch Super Retina XDR display, A17 Pro chip, 48MP camera.",
    price: 139900,
    currency: "INR",
    category: "Smartphones",
    brand: "Apple",
    stock: 17,
    rating: 4.6,
    numReviews: 119,
    images: [
      "https://cdn.example.com/products/iphone15pro-front.jpg",
      "https://cdn.example.com/products/iphone15pro-back.jpg",
    ],
  },
  {
    id: "p1003",
    name: "Nike Air Max 270 Men’s Running Shoes",
    description:
      "Breathable mesh upper, visible Air unit, size 7-12, weightless,black/white.",
    price: 8895,
    currency: "INR",
    category: "Shoes",
    brand: "Nike",
    stock: 54,
    rating: 4.4,
    numReviews: 202,
    images: ["https://cdn.example.com/products/nike270-main.jpg"],
  },
  {
    id: "p1004",
    name: "Philips HD9200/90 Air Fryer",
    description:
      "Rapid Air Technology, 4.1L, 1400W, black, healthy oil-free cooking.",
    price: 8999,
    currency: "INR",
    category: "Kitchen Appliances",
    brand: "Philips",
    stock: 21,
    rating: 4.7,
    numReviews: 317,
    images: ["https://cdn.example.com/products/philipsairfryer.jpg"],
  },
  {
    id: "p1005",
    name: "Wildcraft Supermask W95 Reusable Face Mask (Pack of 3)",
    description:
      "Certified reusable mask with 6-layer filtration, assorted colors.",
    price: 399,
    currency: "INR",
    category: "Masks",
    brand: "Wildcraft",
    stock: 150,
    rating: 4.2,
    numReviews: 81,
    images: ["https://cdn.example.com/products/wildcraftmask.jpg"],
  },
  {
    id: "p1006",
    name: "Dell Inspiron 15 Laptop",
    description:
      "15.6-inch FHD, Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, Win 11, Silver.",
    price: 56990,
    currency: "INR",
    category: "Laptops",
    brand: "Dell",
    stock: 23,
    rating: 4.5,
    numReviews: 153,
    images: ["https://cdn.example.com/products/dellinspiron15.jpg"],
  },
  {
    id: "p1007",
    name: "Samsung Galaxy Tab S9 FE",
    description:
      "10.9-inch 2K Display, S Pen, 8GB RAM, 128GB, 8000mAh Battery.",
    price: 39999,
    currency: "INR",
    category: "Tablets",
    brand: "Samsung",
    stock: 35,
    rating: 4.6,
    numReviews: 92,
    images: ["https://cdn.example.com/products/galaxytab-s9.jpg"],
  },
  {
    id: "p1008",
    name: "JBL Flip 6 Bluetooth Speaker",
    description:
      "Portable wireless speaker, waterproof, 12h playtime, deep bass.",
    price: 8999,
    currency: "INR",
    category: "Speakers",
    brand: "JBL",
    stock: 44,
    rating: 4.7,
    numReviews: 271,
    images: ["https://cdn.example.com/products/jblflip6.jpg"],
  },
  {
    id: "p1009",
    name: "Canon EOS 1500D DSLR Camera",
    description: "24.1MP, 18-55mm lens, WiFi, full HD video, beginners camera.",
    price: 32999,
    currency: "INR",
    category: "Cameras",
    brand: "Canon",
    stock: 13,
    rating: 4.5,
    numReviews: 75,
    images: ["https://cdn.example.com/products/eos1500d.jpg"],
  },
  {
    id: "p1010",
    name: "Mi Smart Band 8",
    description:
      "1.62'' AMOLED, 150+ watch faces, SpO2, heart rate, 16-day battery.",
    price: 2999,
    currency: "INR",
    category: "Wearables",
    brand: "Mi",
    stock: 60,
    rating: 4.6,
    numReviews: 340,
    images: ["https://cdn.example.com/products/miband8.jpg"],
  },
  {
    id: "p1011",
    name: "Google Pixel Buds Pro",
    description:
      "ANC, 31-hour battery, multi-device pairing, wireless charging.",
    price: 18999,
    currency: "INR",
    category: "Earbuds",
    brand: "Google",
    stock: 27,
    rating: 4.4,
    numReviews: 71,
    images: ["https://cdn.example.com/products/pixelbudspro.jpg"],
  },
  {
    id: "p1012",
    name: "Amazon Echo Dot (5th Gen)",
    description: "Smart speaker with Alexa, improved bass, LED display, blue.",
    price: 4499,
    currency: "INR",
    category: "Smart Home",
    brand: "Amazon",
    stock: 90,
    rating: 4.5,
    numReviews: 390,
    images: ["https://cdn.example.com/products/echodot-5th.jpg"],
  },
  {
    id: "p1013",
    name: "SanDisk Extreme Portable SSD 1TB",
    description: "Rugged external SSD, up to 1050MB/s, USB-C & USB-A support.",
    price: 10999,
    currency: "INR",
    category: "Storage",
    brand: "SanDisk",
    stock: 37,
    rating: 4.8,
    numReviews: 255,
    images: ["https://cdn.example.com/products/sandiskssd.jpg"],
  },
  {
    id: "p1014",
    name: "Logitech MX Master 3S Wireless Mouse",
    description: "Ergonomic, MagSpeed scroll, USB-C, 8K DPI sensor, graphite.",
    price: 8499,
    currency: "INR",
    category: "Computer Accessories",
    brand: "Logitech",
    stock: 29,
    rating: 4.6,
    numReviews: 196,
    images: ["https://cdn.example.com/products/mxmaster3s.jpg"],
  },
  {
    id: "p1015",
    name: "Fitbit Versa 4 Smartwatch",
    description:
      "Fitness tracker with Alexa, 6+ day battery, GPS, sleep tracking.",
    price: 16999,
    currency: "INR",
    category: "Wearables",
    brand: "Fitbit",
    stock: 24,
    rating: 4.5,
    numReviews: 113,
    images: ["https://cdn.example.com/products/fitbitversa4.jpg"],
  },
  {
    id: "p1016",
    name: "TP-Link Archer AX53 Wi-Fi 6 Router",
    description: "Dual Band, up to 3000 Mbps, 4-stream Gigabit Wireless.",
    price: 4999,
    currency: "INR",
    category: "Networking",
    brand: "TP-Link",
    stock: 41,
    rating: 4.2,
    numReviews: 62,
    images: ["https://cdn.example.com/products/archerax53.jpg"],
  },
  {
    id: "p1017",
    name: "Philips Hue White & Color Ambiance 9W LED Smart Bulb",
    description: "Smart LED bulb, 16M colors, works with Alexa & Google Home.",
    price: 2499,
    currency: "INR",
    category: "Smart Home",
    brand: "Philips",
    stock: 50,
    rating: 4.6,
    numReviews: 83,
    images: ["https://cdn.example.com/products/hue9wsmbulb.jpg"],
  },
];
const Page = () => {
  //state management using useState
  const [cartProducts, setCartProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState("Home");
  const [cartCount, setCartCount] = useState(0);
  const [orderResponse, setOrderResponse] = useState(null); 
  const [orderError, setOrderError] = useState(null);
  const [cartClick, setcartClick] = useState(false);

  // 🔹 Added loading state
  const [loading, setLoading] = useState(false);

  // Send order to backend and save response or error
  async function addToOrders(nameOfProduct, brandOfProduct, currencyOfItem, priceOfItem) {
    const orderData = {
      name: nameOfProduct,
      brandP: brandOfProduct,
      cItem: currencyOfItem,
      pItem: priceOfItem,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/ordersData", orderData);
      setOrderResponse(response.data);
      setOrderError(null);
    } catch (error) {
      console.error("Error posting order:", error);
      setOrderError("Failed to place order. Please try again.");
      setOrderResponse(null);
    }
  }

  const toggleCartClick = () => {
    setcartClick(!cartClick);
  };
  async function sendAllProductData(){
    //try-catch block to handle errors
    try{
      await axios.post("http://localhost:3000/api/homePageData",products);
    }catch(err){
      //error caught in catch block
      console.log("ERROR OCCURED DURING POSTING",err);
    }
  }
  sendAllProductData();
  async function addToCart(nameOfProduct, brandOfProduct, currencyOfItem, priceOfItem) {
    toggleCartClick();
    const newItem = {
      name: nameOfProduct,
      brandP: brandOfProduct,
      cItem: currencyOfItem,
      pItem: priceOfItem,
    };
    await axios.post("http://localhost:3000/api/cartData",newItem);//send to backend route
    setCartProducts([...cartProducts, newItem]);
    setCartCount(cartCount + 1);
  }

  useEffect(() => {
    if (cartClick) {
      alert("Item Added To Cart ✅");
      toggleCartClick();
    }
  }, [cartClick]);

  async function removeCartItem(itemToFind) {
    await axios.delete("http://localhost:3000/api/cartData",{data:{
    name:itemToFind
    }})
    const idxOfProduct = cartProducts.findIndex(
      (item) => item.name === itemToFind
    );
    cartProducts.splice(idxOfProduct, 1); 
    setCartProducts([...cartProducts]); 
    setCartCount(cartCount - 1); 
    if (cartCount - 1 === 0) {
      alert("The Cart Is Empty");
    }
  }

  // 🔹 Updated to show loader when going back
  function handleGoBack() {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage("Home");
      setLoading(false);
    }, 500);
  }

  // 🔹 Updated to view cart with loader
  function handleViewCart() {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage("cart");
      setLoading(false);
    }, 500);
  }

  // 🔹 Show loading screen during transition
  if (loading) {
    return (
      <div>
        <Navbar/>
        <h1 className="loading-effect">Loading....</h1>
      </div>
    );
  }

  // CART PAGE
  if (currentPage === "cart") {
    return (
      <div>
        <Navbar />
        <title>Shopping Cart</title>
        <button className="back" onClick={handleGoBack}>
          Go Back
        </button>
        <div className="cartcomp">
          {cartProducts.map((item) => (
            <div key={item.name} className="cart-prod">
              <h1 className="cart-prod-name">{item.name}</h1>
              <p className="cart-prod-price">
                {item.cItem} {item.pItem}
              </p>
              <button
                className="cart-prod-remove"
                onClick={() => removeCartItem(item.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // HOME PAGE
  return (
    <div>
      <Navbar />
      <button className="view-cart" onClick={handleViewCart}>
        View Cart({cartCount})
      </button>
      <title>ECommerce App | Top Deals & Top Brands</title>
      <img src="home-pic.jpg" alt="Home banner" />
      <h1 className="product-title">Explore Our Exclusive Range Of Products</h1>
      <hr />
      <div className="products-container">
        {products.map((item) => (
          <div key={item.id} className="main-page-products">
            <p className="product-name">{item.name}</p>
            <p className="product-description">{item.description}</p>
            <p className="product-price">
              Price: {item.currency} {item.price}
            </p>
            <p className="product-brand">Brand: {item.brand}</p>
            <p className="product-category">Category: {item.category}</p>
            <p className="product-rating">Ratings: {item.rating}</p>
            <p className="product-reviews">Reviews: {item.numReviews}</p>
            <button
              className="product-order-button"
              onClick={() =>
                addToOrders(item.name, item.brand, item.currency, item.price)
              }
            >
              Buy Now
            </button>
            <button
              className="product-cart-button"
              onClick={() =>
                addToCart(item.name, item.brand, item.currency, item.price)
              }
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* Order feedback */}
      {orderResponse && (
        <div className="order-success">
          <h2>Order Confirmation</h2>
          <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
        </div>
      )}
      {orderError && (
        <div className="order-error" style={{ color: "red" }}>
          <h2>Error</h2>
          <p>{orderError}</p>
        </div>
      )}
       <div className="homeBottom">
        <div className="bottomLeft">
          <h1 className="bottomLogo">
<i>Shopify.In<br />-All Needs,One Place</i>
          </h1>
          <br />
          <ul className="bottomList">
<li>Adress: 123 Corporate Blvd, Mumbai, Maharashtra</li>
<li>Contact No: +91 98765 43210, +91 98765 26710</li>
<li>Email: support@examplecompany.com</li>
<li>Head Office Address: 456 Market Street, Bengaluru, Karnataka
</li></ul>
          <p className="bottom-legal">2024-25, Shopify.In, All Rights Reserved
          </p>
        </div>
        <div className="bottomRight">
          
          <br />
          <li>
 <a className="XLINK" href="#">X : https://www.instagram.com/example_bot/</a>
          </li>
          <li>
<a className="FLINK" href="#"> FaceBook : https://www.facebook.com/example.bot</a>
          </li>
          <li>
<a className="LLink" href="#">LinkedIn : https://www.linkedin.com/in/example-bot/</a>
          </li>
        \</div>
        <div className="bottom-end">
          <h3 className="bottom-right-prod">Our Products</h3>
          <ul>
            <li className="bot-right-prod-list">Shopify Books</li>
            <br />
            <li className="bot-right-prod-list">Shopify Music</li>
            <br />
            <li className="bot-right-prod-list">Shopify Video</li>
            <br />
            <li className="bot-right-prod-list">Groceries By Shopify</li>
          </ul>
        </div>
      </div>
  </div>
  );
};

export default Page;