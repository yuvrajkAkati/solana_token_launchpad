import React , {FC} from 'react'

export const InputView = ({placeholder, name , clickHandle}) => {
  
  return (
    <div className='py-1'>
      <div className='text-sm text-slate-400 uppercase p-1'>
        {name}
      </div>
      <div className=''>
        <input type="text" placeholder={placeholder} className='border bg-slate-900 rounded-lg h-8 font-light w-full pl-2 pb-3 ' onChange={clickHandle} />
      </div>
    </div>
  )
}

