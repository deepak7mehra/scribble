import { useState } from "react"

import { useNavigate } from "react-router-dom";

export default function Home() {

    const [name,setName] = useState<String>("");
    const navigate = useNavigate();
   
   
    function handleClick(){
        navigate("/game")
        
        
    }

    

  return (
    <div className="flex flex-col h-screen justify-center items-center">
        
        <div className="mb-4">
            <input className="border-2 border-black" onChange={(e)=>setName(e.target.value)} type="text"  id="name" placeholder="enter your name"/>

        </div>

        <div>
        <button onClick={handleClick} className="bg-red-500 p-5">Play!</button>
        </div>
        

    </div>
  )
}
