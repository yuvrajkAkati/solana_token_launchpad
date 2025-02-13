import { secureHeapUsed } from "crypto";
import React , {FC} from "react";
import {MdGeneratingTokens ,MdArrowForward, MdDescription} from "react-icons/md"
export const ToolView : FC = ({
  setOpenAirdrop,
  setOpenCreateModal, 
  setOpenSendTransaction, 
  setOpenTokenMetadata }) => {
    const tools = [
      {
        name : "Create Tokens",
        icon : <MdGeneratingTokens/>,
        function : setOpenCreateModal,
        description : "Create your own token without writing any code"
      },
      {
        name : "Token Metadata",
        icon : <MdGeneratingTokens/>,
        function : setOpenTokenMetadata,
        description : "Drop the metadata related to your token here"

      },
      {
        name : "Airdrop",
        icon : <MdGeneratingTokens/>,
        function : setOpenAirdrop,
        description : "Airdrop yourself some sol!"
      },
      {
        name : "Send Transaction",
        icon : <MdGeneratingTokens/>,
        function : setOpenSendTransaction,
        description : "Perform transactions on the blockchain from here"

      }
    ]
    return (
      <section id="tools" className="p-20">
        <div>
          <div className="">
            <div className="text-4xl text-slate-400 flex shadow-lg pb-3">Other features of SOLANA <span className="pl-3"><MdArrowForward></MdArrowForward></span></div>
          </div>
          <div className="grid grid-cols-4 px-20 gap-10 pt-10 ">
            {
              tools.map((tool,index)=>{
                return (
                  <div className="p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md h-52 " onClick={()=>tool.function(true)}>
                  <div className="bg-slate-900  p-4 rounded-md h-full text-2xl text-slate-500">
                    <div className="underline">{tool.name}</div>
                    <div className="pt-3 text-lg">{tool.description}</div>
                    <a className="flex text-purple-700 text-lg  "><span className="shadow-lg">Try it out</span><span className="pt-[6px] pl-2 shadow-lg"><MdArrowForward/></span> </a>
                  </div>
                </div>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }