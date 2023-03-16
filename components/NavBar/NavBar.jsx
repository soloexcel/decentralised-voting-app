import React, { useState, useEffect, useContext } from 'react'
import { Button } from '../componentsIndex'
import Style from './NavBar.module.css'
import { ElectionContext } from '../../context/Context'
import Link from 'next/link'

const NavBar = () => {
const { connectWallet, walletAddr } = useContext(ElectionContext)
const [buttonConnected, setButtonConnected] = useState(false)

const { ownerAddress,  } = useContext(ElectionContext);
  

const itemsArray = [
  {
    item: "Admin",
    link: "admin",
    tag: "admin"
  },

  {
    item: "Register",
    link: "register-voters",
    tag: "general"
  },

  {
    item: "Vote",
    link: "cast-vote",
    tag: "general"
  },

  {
    item: "Result",
    link: "result",
    tag: "general"
  }
]


  return (
    <div className={Style.navbar}>
        <p className={Style.logo}>
          <Link href={"/"}>PROWESS</Link>    
        </p>

        <div className={Style.items}>
          {itemsArray.map((el, i) => (
            <div key={i + 1} className={Style.item}>
              <Link href={{ pathname: `${el.link}` }}>{el.item}</Link> 
            </div>
          ))}
        </div>

        <div className= {Style.button}>
            <Button btnName={walletAddr && walletAddr.length > 0 ? "Connected" : "Connect"} handleClick={connectWallet} />
        </div>
        
    </div>
  )
}

export default NavBar