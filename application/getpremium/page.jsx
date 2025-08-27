"use client"
import React from 'react'
import Navbar from '../Navbar'
import "./page.css"
const GetPrem = () => {
  return (
    <div className='premium'>
      <title>Subscription</title>
      <Navbar/>
      <table>
        <tr>
            <td>
                <div className="tile">
                    <h1>Basic</h1>
                    <hr></hr>
                    <ul>
                      <li>Recommendations</li>
                      <li>Unlimited Access To All Products</li>
                      <li>Free Access To Video.In</li>
                      <li>Unlimited Orders</li>
                      <li>Free Delivery Above $200</li>
                      <li>24X7 Support</li>
                      <li>Standard Delivery</li>
                      <li>Wishlist</li>
                      <li>Returns & Refunds</li>
                      <li>Exclusive Discounts & Offers</li>
                      <li>Multiple Payment Options</li>
                    </ul>
                </div>
            </td>
            <td>
                <div className='tile'>
                  
                      <h1>Premium</h1>
                      <hr></hr>
                    <ul>
                      <li>Everything In Basic</li>
                      <li>Vouchers & Coupons</li>
                      <li>Early Access To Festivals</li>
                      <li>1 Day Free Delivery</li>
                      <li>Pay Later</li>
                      <li>Access To Video,Bot.ai,Music & Photos</li>
                      <li>Priority Customer Attention</li>
                      <li>No Surge Prices</li>
                    </ul>
                    <button className='newPlan'>Subsribe</button>

                    </div>
              </td>
        </tr>
      </table>
    </div>
  )
}

export default GetPrem;
