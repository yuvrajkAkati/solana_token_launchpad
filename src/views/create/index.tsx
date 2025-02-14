import React,{FC ,useCallback,useState,useEffect} from 'react'
import {useConnection,useWallet} from "@solana/wallet-adapter-react"
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js"
import { 
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction
} from '@solana/spl-token'
import { 
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
  createCreateMetadataAccountInstruction,
} from '@metaplex-foundation/mpl-token-metadata'
import axios from "axios"
import { notify } from '../../utils/notifications'
import { ClipLoader } from 'react-spinners'
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider'

import {AiOutlineClose} from "react-icons/ai"
import CreateSvg from "../../components/SVG/CreateSVG"
import { json } from 'stream/consumers'
import { compareByDepth } from 'framer-motion/types/render/utils/compare-by-depth'
import { InputView } from 'views/input'
// import { InputView } from "../index"
// import Branding from '../../components/Branding'

export const CreateView : FC = ({
  setOpenCreateModal
}) => {
  const {connection} = useConnection()
  const {publicKey , sendTransaction} = useWallet()
  const {networkConfiguration} = useNetworkConfiguration()


  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 300); // Delay in milliseconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);


  const[tokenUri,setTokenUri] = useState('')
  const [tokenMintAddress,setTokenMintAddress] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const[token , setToken] = useState({
    name : "",
    symbol : "",
    decimals : "",
    amount : "",
    image : "",
    description : ""
  })

  const handleFormFieldChange = (fieldName,e) => {
      setToken({...token , [fieldName] : e.target.value})
  }

  //token creation
  const createToken = useCallback(
    async(token)=>{
      const lamports = await getMinimumBalanceForRentExemptMint(connection)
      const mintKeypair = Keypair.generate()
      const tokenAta = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      )

      try {
        const metadataUrl = await uploadMetadata(token)
        console.log(metadataUrl)
        const createMetadataInstruction = createCreateMetadataAccountV3Instruction({
          metadata : PublicKey.findProgramAddressSync([
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer()
          ],
        PROGRAM_ID,
        )[0],
          mint : mintKeypair.publicKey,
          mintAuthority : publicKey,
          payer : publicKey,
          updateAuthority : publicKey
        },{
        createMetadataAccountArgsV3 : {
          data : {
            name : token.name,
            symbol : token.symbol,
            uri : metadataUrl,
            creators : null,
            sellerFeeBasisPoints : 0,
            uses : null,
            collection: null
          },
          isMutable : false,
          collectionDetails : null
       }
        })

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey : publicKey,
            newAccountPubkey : mintKeypair.publicKey,
            space : MINT_SIZE,
            lamports : lamports,
            programId : TOKEN_PROGRAM_ID
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            Number(token.decimals),
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenAta,
            publicKey,
            mintKeypair.publicKey
          ),
          createMintToInstruction(
            mintKeypair.publicKey,
            tokenAta,
            publicKey,
            Number(token.amount) * Math.pow(10,Number(token.decimals))
          ),
          createMetadataInstruction
        )
        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,{
            signers : [mintKeypair]
          }
        )
        setTokenMintAddress(mintKeypair.publicKey.toString())
        notify({
          type : "success",
          message : "token created!!",
          txid : signature
        })
      } catch (error : any) {
        notify({type : "error" , message : "token creation failed"})
      }
      setIsLoading(false)
  },[publicKey,connection,sendTransaction])

  //image
  const handleImageChange = async(event) => {
    const file = event.target.files[0]

    if(file){
      const imageUrl = await uploadImagePinata(file)
      setToken({...token , image : imageUrl})
    }
  }

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  //uplaod to ipfs
  const url2 = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
  const uploadImagePinata = async(file) => {
    if(file){
      try {
        const formData = new FormData()
        formData.append("file",file)
        console.log(file)
        const response = await axios.post(
          url,
          formData,
          { headers : {
            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MTU3ZTQ3Ny1kZGZmLTRlOWItYmE2OC01MGFiNmY3ZWM0NjAiLCJlbWFpbCI6Ink2MzUyODIxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NzRlMTZkOTI1MDAwZDBmZWVlZCIsInNjb3BlZEtleVNlY3JldCI6ImE5ZTZmYWE4NDExNzZkNmUxODg5ODJmMWU0Njg1NTU0YjhjNDNiZTY0M2E4NDg0NDQ2MDQ4NjI3YTY4YmU0NzEiLCJleHAiOjE3NzEwNzA0MDN9.kjcHoKd8nZmR2gfIzJ8ILj8VXeCicTt9VPtl_GMws8c",
          }
        })

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
        console.log(ImgHash)
        return ImgHash
      } catch (error) {
        notify({type : "error" , message : "upload image failed"})
      }
      setIsLoading(false)
    }
  }

  //metadata
  const uploadMetadata = async ( token )=>{
    setIsLoading(true)
    const {name ,symbol , description ,image} = token
    if(!name || !symbol || !description || !image){
      return notify({type : "error" , message : "data is missing"})
    }

    const data = JSON.stringify({
      name : name ,
      symbol : symbol,
      description : description,
      image : image 
    })

    try {
      const response = await axios.post(
        url2 ,
        data,
        {headers : {
            'Content-Type' : 'application/json',
            Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MTU3ZTQ3Ny1kZGZmLTRlOWItYmE2OC01MGFiNmY3ZWM0NjAiLCJlbWFpbCI6Ink2MzUyODIxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NzRlMTZkOTI1MDAwZDBmZWVlZCIsInNjb3BlZEtleVNlY3JldCI6ImE5ZTZmYWE4NDExNzZkNmUxODg5ODJmMWU0Njg1NTU0YjhjNDNiZTY0M2E4NDg0NDQ2MDQ4NjI3YTY4YmU0NzEiLCJleHAiOjE3NzEwNzA0MDN9.kjcHoKd8nZmR2gfIzJ8ILj8VXeCicTt9VPtl_GMws8c",
          }}
      )
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      return url
    } catch (error : any) {
      notify({type : "error" , message : "upload to pinnat json failed"})
    }
    setIsLoading(false)
  }

  return (
    <>
      {
        isLoading && (
          <div className=''>
            <ClipLoader></ClipLoader>
          </div>
        )
      }

      {!tokenMintAddress ? (
        <section className={`flex px-10 w-full h-screen justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transition-all duration-2000 ease-in-out transform ${
        showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } `}>
          <div className='grid grid-cols-2 bg-default-900 w-4/5 px-10'>
              <div className='flex items-center justify-center'>
              <div className=' bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-lg flex items-center justify-center w-80 h-80 p-0.5'>
                <div className=' bg-slate-900 rounded-lg flex items-center justify-center w-full h-full '>
                  {token.image ? (
                    <img src={token.image} alt="token" className='w-4/5 rounded-lg' />
                  ):(<>
                    <label htmlFor='file' className='items-center'>
                      <div className='icon'><CreateSvg/></div>
                      <div className='text pt-2'><span>CLICK TO UPLOAD IMAGE</span></div>
                      <input type="file" id='file' onChange={handleImageChange} className='hidden'/>
                    </label>
                    </>)}
                  </div>
                </div>
              </div>
            <div>
                <div>
                    <div className='flex justify-center h-screen'>
                      <div>
                        <div className='text-4xl pt-10 font-bold text-white'>SOLANA TOKEN</div>
                        <div className='text-xl pb-5 uppercase text-slate-400'>provide the details for your token </div>
                        <InputView placeholder="name" name= "name" clickHandle={(e)=>handleFormFieldChange('name',e)}></InputView>
                        <InputView placeholder="symbol" name= "symbol" clickHandle={(e)=>handleFormFieldChange('symbol',e)}></InputView>
                        <InputView placeholder="decimals" name= "decimals" clickHandle={(e)=>handleFormFieldChange('decimals',e)}></InputView>
                        <InputView placeholder="amount" name= "amount" clickHandle={(e)=>handleFormFieldChange('amount',e)}></InputView>
                        <div className='pl-1 pt-5'>
                          <textarea placeholder="Description of your token" rows={4} name= "name" className='border bg-slate-900 pl-3 pt-2 w-full rounded-lg' onChange={(e)=>{
                            handleFormFieldChange("description",e)
                          }}>
                          </textarea>
                        </div>
                        <div className='pt-2'>
                        <button className='w-full bg-black text-slate-400 p-2 rounded-lg ' onClick={()=>{
                          createToken(token)
                        }}>Create token</button>
                        </div>
                        <div className='flex items-center justify-center pt-2'><button className='bg-slate-600 rounded-full p' onClick={()=>{
                          setOpenCreateModal(false)
                        }}>back</button></div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      ):""}
    </>
  )
}

