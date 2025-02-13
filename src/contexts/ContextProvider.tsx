import { WalletAdapterNetwork , WalletError } from "@solana/wallet-adapter-base"
import * as walletAdapterReact from "@solana/wallet-adapter-react"
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter} 
from "@solana/wallet-adapter-wallets"
import {Cluster,clusterApiUrl} from "@solana/web3.js"
import {FC , ReactNode , useCallback , useMemo} from "react"
import {AutoConnectProvider , useAutoConnect} from "./AutoConnectProvider"
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration
} from "./NetworkConfigurationProvider"
import { notify } from "../utils/notifications"

const WalletContextProvider : FC<{children : ReactNode}> = ({children}) => {
  const {autoConnect} = useAutoConnect()
  const {networkConfiguration} = useNetworkConfiguration()
  const network = networkConfiguration as WalletAdapterNetwork

  const originalEndPoint = useMemo(()=> clusterApiUrl(network),[network])
  let endpoint;

  if(network == "mainnet-beta"){
    endpoint = "https://solana-mainnet.g.alchemy.com/v2/74MsmbLUtL80_dtn9ADFsewZRlv9l4pG"
  }else if (network == "devnet") {
    endpoint = originalEndPoint
  }else {
    endpoint = originalEndPoint
  }

  const wallets = useMemo(()=>[
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new SolletWalletAdapter()
  ],
  [network]
)

const onError = useCallback((error : WalletError)=>{
  notify({
    type : "error",
    message : error.message ? `${error.name} : ${error.message}` : error.name,
  })
  console.error(error)
},[])

return (
  <walletAdapterReact.ConnectionProvider endpoint={endpoint}>
    <walletAdapterReact.WalletProvider 
      wallets={wallets}
      onError={onError} 
      autoConnect={autoConnect}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </walletAdapterReact.WalletProvider>
  </walletAdapterReact.ConnectionProvider>
  )
}

export const ContextProvider: FC<{children : ReactNode}> = ({
  children
}) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  )
}
