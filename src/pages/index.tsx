import React, { useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"


import {HomeView , ToolView , FeatureView , OfferView , FaqView , TokenMetadata , AirdropView , DonateView, CreateView , ContactView} from "../views"


const Home : NextPage = (props) => {
  
  const [openCreateModal , setOpenCreateModal] = useState(false)
  const [openTokenMetadata , setOpenTokenMetadata] = useState(false)
  const [openContact , setOpenContact] = useState(false)
  const [openAirdrop , setOpenAirdrop] = useState(false)
  const [openSendTransaction , setOpenSendTransaction] = useState(false)

  return (
    <>
      <Head>
        <title>Solana token Creator</title>
        <meta name="Solana token Creator" content="build and create solana token"></meta>
      </Head>
        <HomeView setOpenCreateModal={setOpenCreateModal}/>
        <ToolView
          setOpenAirdrop = {setOpenAirdrop}
          setOpenContact = {setOpenContact}
          setOpenCreateModal = {setOpenCreateModal}
          setOpenSendTransaction = {setOpenSendTransaction}
          setOpenTokenMetadata = {setOpenTokenMetadata}
        />
        <FeatureView setOpenAirdrop = {setOpenAirdrop}
          setOpenContact = {setOpenContact}
          setOpenCreateModal = {setOpenCreateModal}
          setOpenSendTransaction = {setOpenSendTransaction}
          setOpenTokenMetadata = {setOpenTokenMetadata}/>
         
          {/* <OfferView></OfferView> */}
          {/* <FaqView></FaqView> */}

          {openCreateModal && (
            <div className="new_loader relative h-full bg-slate-900">
              <CreateView setOpenCreateModal={setOpenCreateModal}></CreateView>
            </div>
          )}
           {/*
          {openTokenMetadata && (
            <div className="new_loader relative h-full bg-slate-900">
              <TokenMetadata setOpenTokenMetadata={setOpenTokenMetadata}></TokenMetadata>
            </div>
          )}{openContact && (
            <div className="new_loader relative h-full bg-slate-900">
              <ContactView setOpenContact={setOpenContact}></ContactView>
            </div>
          )}{openAirdrop && (
            <div className="new_loader relative h-full bg-slate-900">
              <AirdropView setOpenAirdrop={setOpenAirdrop}></AirdropView>
            </div>
          )}{openSendTransaction && (
            <div className="new_loader relative h-full bg-slate-900">
              <DonateView setOpenSendTransaction={setOpenSendTransaction}></DonateView>
            </div>
          )} */}
    </>
  )
}

export default Home