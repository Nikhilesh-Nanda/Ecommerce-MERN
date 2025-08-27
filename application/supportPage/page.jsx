import "./spage.css";
import React from "react";
import Navbar from "../Navbar";
const page = () => {
  return (
    <div>
        <title>Help & Support</title>
      <Navbar />
      <div className="support-wrapper">
      <h1 className="support-heading">🛒 E-Commerce Support & Help Center</h1>
      <section className="support-emergency">
        <h2>Order Emergencies</h2>
        <ul>
          <li>If your order hasn't arrived within the promised delivery time, <b>contact support immediately</b>.</li>
          <li>Received a <b>damaged or incorrect item</b>? Use the "Order Issue" button on your orders page, or call us below.</li>
          <li>For payment failures or issues with refunds, let us know as soon as possible for faster resolution.</li>
        </ul>
      </section>
      <section className="support-cautions">
        <h2>Cautions & Best Practices</h2>
        <ul>
          <li><b>Do not share</b> your account password or card details via email, call, or chat.</li>
          <li>If you spot any suspicious offers or emails claiming to be us, <b>confirm through official channels</b> before acting.</li>
          <li>Always double-check your shipping address at checkout to avoid delivery problems.</li>
          <li>Keep your app and browser updated for safer transactions and better experience.</li>
        </ul>
      </section>
      <section className="support-contact">
        <h2>Contact Our Support Team</h2>
        <ul>
          <li><b>Email:</b> care@shopfast.com</li>
          <li><b>Phone:</b> +91-9876543210</li>
          <li><b>WhatsApp:</b> +91-9876543210</li>
          <li><b>Live Chat:</b> Available in your account dashboard (9am – 9pm IST)</li>
        </ul>
      </section>
      <footer className="support-footer">
        <p>Need quick help? Use live chat or call us. We’re here to keep your shopping smooth and safe!</p>
      </footer>
    </div>

    </div>
  );
};

export default page;
