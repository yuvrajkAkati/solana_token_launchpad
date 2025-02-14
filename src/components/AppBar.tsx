import {FC, useState} from 'react'
import link from "next/link"
import NetworkSwitcher from './NetworkSwitcher' 

export const AppBar : FC = (props) => { 
  const menu = [
    {
      name : "Home",
      link : "#home"
    },
    {
      name : "Tools",
      link : "#tools"
    },
    {
      name : "About us",
      link : "#aboutUs"
    }
  ]
  return (
    <div>
      <header id='navbar-sticky' className='navbar bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-b-lg text-white'>
        <div className='container '>
          <nav className=''>
            <div className='font-bold'>SOLANA</div>
            <div className='flex'>{menu.map((items)=>{
              return(
                <a href={items.link} className='px-7'>{items.name}</a>
              )
            })}</div>
            <div className={``}><NetworkSwitcher></NetworkSwitcher> </div>
          </nav>
        </div>
      </header>
    </div>
  )
} 