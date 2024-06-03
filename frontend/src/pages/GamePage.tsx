import React, { useEffect, useState } from 'react'

import { useSocket } from '../hooks/useSocket'
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import SelectWord from '../components/SelectWord';

export default function GamePage() {
    const [waiting,setWaiting] = useState<boolean>(true);
    const [selWord,setSelword] = useState<boolean>(false);
    const [words,setWords] = useState<string[]>([]);

    console.log("words = ",words)

    const socket = useSocket();
    const navigate = useNavigate();

    function handleSelectWord(word:string){

        socket?.send(JSON.stringify({
            type:"SET_WORD",
            word
        }))

        setSelword(false)

    }



    useEffect(()=>{
        if(socket){
            socket.send(JSON.stringify({
                type:"INIT_GAME"
            }))
            
        }
    },[socket])

    useEffect(()=>{
        if (socket!==null){

            

            socket.onmessage = (x)=>{
                const data = JSON.parse(x.data);
                console.log(data)
                if (data.status==="started"){
                    setWaiting(false);
                }
                if (data.status==="WORD_SET"){
                    setWaiting(false);
                }

                if (data.status === "GAMEOVER"){
                    navigate("/")
                }

                if (data.status === "SEL_WORD"){
                    console.log("INside word")
                }

                if (data.status === "SEL_WORD"){
                    setWords(data.words)
                    setSelword(true);
                }
            }
        }
    },[socket]);

    if (socket===null) return <div>connecting ... </div>
  return (
    <div >
      {waiting && !selWord && <div>waiting for user to join</div>}

      {!waiting && <div className='grid grid-cols-10'>
            
            <div className='col-span-6'> <Board socket={socket} />  </div>
            <div className='col-span-2'>chats</div>
        

        </div>}

        {selWord && <div><SelectWord handleSelectWord={handleSelectWord} words={words} /></div>}
    </div>
  )
}
