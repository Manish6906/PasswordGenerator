import React, { useState, useCallback, useEffect ,useRef} from 'react'

export default function Home() {
    const [length , setLength] = useState(6)
    const [ number, setNumber] =useState(false)
    const [character, setCharacter] = useState(false)
    const [password, setPAssword] = useState("")


    // useRef Hook
    const passwordRef = useRef(null)

const copyToclipboard= useCallback(()=>{passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)},[password])

    const passowrdGenerator= useCallback(()=>{
        let pass= ""
        let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(number) str += "0123456789"
        if(character) str+="~!@#$%^&*()_+={}[]:;<>,.?/"

        for(let i=1 ; i<= length ; i++)
        {
            let char= Math.floor(Math.random()* str.length +1);
             pass +=  str.charAt(char)
        }
        setPAssword(pass)
    }, [length, number, character,])

    useEffect(()=>{
        passowrdGenerator()
    }, [length, number, character,passowrdGenerator])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 my-8 bg-[#FFC470]'>
      <h1 className='text-4xl  text-center font-medium text-[#DD5746] mt-5'>Text Generator</h1>

      <input className='w-full py-1 px-3 mb-3 mt-2 outline-0 rounded-md' ref={passwordRef} value={password} type='text' placeholder='Password' readOnly />
      <button className='outline-0  bg-[#135D66] rounded-md p-1 mb-1 text-white active:opacity-70' onClick={copyToclipboard}>Copy Text</button>
      <div className='md:flex mb-1  '>
        <input type="range" className='cursor-pointer' min={6} max={30} value={length} onChange={(e) => {setLength(e.target.value)}} /><br/>
        <label className='text-[#8B322C] font-medium'> Length: {length}</label><br/>

        <input className='md:ml-5' type="checkbox" defaultValue={number} onClick={() => {setNumber((pre) => !pre)}}/>
        <label htmlFor="input"  className='text-[#8B322C] font-medium  mr-3' >Number</label><br/>

        <input className=' ms:ml-5'  type="checkbox" defaultValue={character} onChange={() => {setCharacter((pre) => !pre)}}/>
        <label htmlFor="input"  className='text-[#8B322C] font-medium'>Character</label>
      </div>
      <button className='bg-blue-600 text-white mb-1 active:opacity-70 rounded-md' onClick={passowrdGenerator}>Refresh</button>
    </div>
  )
}
