import React from 'react'

const CardCommon = ({ title, number }) => {
  return (
    <div className='flex-1 h-[100px] shadow-md bg-white flex flex-col justify-center px-5 rounded-md'>
        <h1 className='text-base text-gray-600 font-bold'>{title}</h1>
        <h3 className='text-2xl font-black' >{number}</h3>
    </div>
  )
}

export default CardCommon