import React ,{FC} from 'react'
import { useForm } from '@formspree/react'
import{
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube
} from "react-icons/ti"
import { TypingEffect } from 'effects/TypingEffect'
  
export const Footer : FC = () => {
  const menuOne = [
    "support" , "center" , "customer" , "customer"  
  ]
  const menuTwo = [
    "support" , "center" , "customer" , "customer"  
  ]
  return (
    <section id='aboutUs'>
    <div className='p-6'>
      <div className=' text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  py-20 grid grid-cols-2 px-20 rounded-lg'>
       <div className='grid grid-cols-2'>
          <div className=''>
            <div className='text-4xl  text-slate-900'>About us</div>
            <div className='pt-3'>{menuOne.map((item)=>{
            return (
              <li className='text-slate-900 font-light'>{item}</li>
            )
          })}</div>
          </div>
          <div className=''>
            <div className='text-4xl text-slate-900'>About us</div>
            <div className='pt-3'>{menuOne.map((item)=>{
            return (
              <li className='text-slate-900 font-light'>{item}</li>
            )
          })}</div>
          </div>
       </div>
       <div className='bg-slate-900 flex items-center justify-center rounded-lg '>
        <div className=' h-3/5 w-4/5'>
          <TypingEffect text="Thank you! Please visit again!" ></TypingEffect>
        </div>
       </div>
    </div>
    </div>
    </section>
  )
}

