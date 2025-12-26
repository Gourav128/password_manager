import React from 'react'

const Footer = () => {
    return (
        <div className="bg-slate-800 text-white flex flex-col fixed bottom-0 justify-center items-center w-full">
            <div className="logo font-bold  text-black text-2xl">
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Cretaed with <div className="flex w-22">
                    <lord-icon
                        src="https://cdn.lordicon.com/ajzwsrcs.json"
                        trigger="hover" >
                    </lord-icon>  by GOURAV BHATIA
                </div>
            </div>
        </div>
    )
}

export default Footer
