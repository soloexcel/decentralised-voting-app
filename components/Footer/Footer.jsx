import React from 'react'
import Style from "./Footer.module.css"
import Link from 'next/link'
import { FaLinkedin, FaGithub, FaTwitter, FaTelegramPlane } from 'react-icons/fa';


const Footer = () => {

  const socialMediaLinks = [
    {
      name: "github",
      link: "https://github.com/soloexcel/nftdapp",
      icon: <FaGithub/>,
    },

    {
      name: "twitter",
      link: "https://twitter.com/blockie_chain",
      icon: <FaTwitter/>,
    },

    {
      name: "linkedIn",
      link: "https://www.linkedin.com/in/solomon-lekan-5319a9212/",
      icon: <FaLinkedin/>,
    },

    {
      name: "telegram",
      link: "https://t.me/blockie_chain",
      icon: <FaTelegramPlane/>
    }
      
  ]

  return (
    <div className={Style.status}>

        <p>
            Prowess, With License From Grandida LLC.
        </p>

        <div className={Style.mediaSection}>
            {socialMediaLinks.map((media, idx)  => ( 
                  <div key={idx + 1} className={Style.link}>
                    <Link href={{ pathname: `${media.link}` }} >{media.icon}</Link>
                  </div>
              ))}
        </div>
    </div>
  )
}
export default Footer