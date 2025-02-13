import {FC} from 'react'
import dynamic from 'next/dynamic'
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider"
// import NetworkSwitcherSVG from './SVG/NetworkSwitcherSVG'
const NetworkSwitcher : FC = () => {
  const {networkConfiguration , setNetworkConfiguration} = useNetworkConfiguration()
  return (
    <div className=''>
      <input type='checkbox' id='checkbox'></input>
      <label className='switch'>
        <select value={networkConfiguration} 
          onChange={(e)=>{
            setNetworkConfiguration(e.target.value || "devnet")
          }} className='bg-purple-700 px-2 items-center flex rounded-lg w-10 '>
          <option className='' value="mainnet-beta">main</option>
          <option value="devnet">dev</option>
          <option value="testnet">test</option>
        </select>
      </label>
    </div>
  )
}

export default dynamic(() => Promise.resolve(NetworkSwitcher),{
  ssr : false 
})