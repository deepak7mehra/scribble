import React from 'react'

interface selectWordInterface {
    words: string[]
    handleSelectWord : (e:string) => void
}

export default function SelectWord({words , handleSelectWord}:selectWordInterface) {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
        <div className='mb-10 text-4xl font-bold'>choose a word</div>
        
        <div className='grid grid-cols-3 gap-10'>
      {
        words.map(w=>{
            return (
                <div onClick={()=>handleSelectWord(w)} className='bg-gray-500 p-2 rounded-lg shadow-lg shadow-black cursor-pointer'>
                    {w}
                </div>
            )
        })
      }
      </div>
    </div>
  )
}
