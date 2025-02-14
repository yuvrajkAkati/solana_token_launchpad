import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {motion} from "framer-motion"

export const HomeView : FC = ({setOpenCreateModal} ) => {
  return <section id="home" className="text-xl text-slate-500 h-screen ">
    <div className="pt-28 px-20">
      <div className="">
        <div className="grid grid-cols-2 flex justify-center pt-10 uppercase">
          <div className="pt-12">
              <div className="text-6xl">
                create your own
              </div>
              <div className="text-9xl ">
                SOLANA
              </div>
              <div className="text-6xl">
                <div>
                  <div className="flex pt-3">
                  <div>TOKEN</div>
                  <div className="flex items-center pl-4">
                  <motion.div
                    initial={{width : 0 }}
                    animate={{width : "25vw"}}
                    transition={{ease: [0.76,0,0.24,1], duration:1}}
                    className="element bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[28vw] h-[4vw] rounded-lg">
                  </motion.div>
                  </div>
                  </div>
                  <div className="pt-9 pl-10 flex ">
                    <a onClick={()=>setOpenCreateModal(true)}>
                      <span className="text-xl border-x rounded-lg p-2 hover:text-slate-400">create</span>
                    </a>
                      <div className="pl-2 pt-5"><WalletMultiButton></WalletMultiButton></div>
                  </div>
                </div>
              </div>
          </div>
          <div ><img className="rounded-lg" src="assets/images/ai/img-new.jpg"></img></div>
        </div>
      </div>
    </div>
  </section>
}
