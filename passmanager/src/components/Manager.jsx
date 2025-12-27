import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();

    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPassword()
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyeclosed.jpg")) {
            ref.current.src = "icons/eye.jpg"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eyeclosed.jpg"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            
            await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:form.id})})

            
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
           await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},
                body:JSON.stringify({...form, id:uuidv4()})})
                // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
                // console.log([...passwordArray, form])
                setForm({ site: "", username: "", password: "" })
            } else {
                toast('Error:Passowrd not saved !');
            }
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
            });
        }
        const deletePassword = async(id) => {
            const c = confirm("Do you really want to delete password")
            if (c) {
                setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
          let res =await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})})
            toast('Password Deleted ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // console.log([...passwordArray, form])
        }
    }
    const editPassword = (id) => {
        setForm({...passwordArray.filter(i => i.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Coied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
            <div className=" p-2 md:p-0 md:mycontainer">
                <h1 className="text-4xl text font-bold text-center">
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className="text-black flex flex-col p-4 text-black gap-8 items-center">

                    <input name='site' value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" className='rounded-full border border-green-400 w-full p-4 py-1' id='site' />

                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-full border border-green-400 w-full p-4 py-1' id='username' />
                        <div className="relative">
                            <input name='password' value={form.password} onChange={handleChange} ref={passwordRef} placeholder='Enter Password' type="password" className='rounded-full border border-green-400 w-full p-4 py-1' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eyeclosed.jpg" alt="eye emoji" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center text-black bg-green-400 rounded-full px-5 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/fgxwhgfp.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#121331,secondary:#000000">
                    </lord-icon>Save Passowrd</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2' >Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'><div className='flex items-center justify-center'><a href="{item.site} " target='_blank'>{item.site}</a>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                            <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/rrbmabsx.json"
                                                trigger="hover"
                                            ></lord-icon></div>
                                    </div></td>
                                    <td className=' justify-center py-2 border border-white text-center'><div className="flex items-center justify-center"><span>{item.username}</span><div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                        <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/rrbmabsx.json"
                                            trigger="hover"
                                        ></lord-icon></div>
                                    </div></td>
                                    <td className=' justify-center py-2 border border-white text-center '><div className="flex items-center justify-center"><span>{"*".repeat(item.password.length)}</span> <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                        <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddinLeft": "3px" }}
                                            src="https://cdn.lordicon.com/rrbmabsx.json"
                                            trigger="hover"
                                        ></lord-icon></div>
                                    </div></td>
                                    <td className=' justify-center py-2 border border-white text-center '>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/exymduqj.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
