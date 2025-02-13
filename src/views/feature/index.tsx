import React , {FC} from 'react'
import { MdToken } from 'react-icons/md'


export const FeatureView = ({
          setOpenAirdrop,
          setOpenContact,
          setOpenCreateModal,
          setOpenSendTransaction,
          setOpenTokenMetadata
}) => {
  const features = [
    {
      name : "get airdrop",
      icon : <MdToken></MdToken>,
      description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eius voluptate tenetur non enim deleniti perferendis? Nesciunt facilis omnis natus.",
      function : setOpenAirdrop
    },{
      name : "token generator",
      icon : <MdToken></MdToken>,
      description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eius voluptate tenetur non enim deleniti perferendis? Nesciunt facilis omnis natus.",
      function : setOpenCreateModal
    },{
      name : "transfer sol",
      icon : <MdToken></MdToken>,
      description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eius voluptate tenetur non enim deleniti perferendis? Nesciunt facilis omnis natus.",
      function : setOpenSendTransaction
    },{
      name : "Token Metadata",
      icon : <MdToken></MdToken>,
      description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi eius voluptate tenetur non enim deleniti perferendis? Nesciunt facilis omnis natus.",
      function : setOpenTokenMetadata
    },
  ]
  return (
    <section id='feature'>
      features
    </section>
  )
}
