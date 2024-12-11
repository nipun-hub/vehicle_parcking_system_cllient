import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <dev className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" srcset="" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Compant</h2>
          <ul>
            <li>Home</li>
            <li>Abour us</li>
            <li>Delivary</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+94-77-889-9555</li>
            <li>COntact@tomato.com</li>
          </ul>
        </div>
      </dev>
      <hr />
      <p className="footer-copyright">Copyright 2024 0 Tomato.com - All Right Resered</p>
    </div>
  )
}

export default Footer
