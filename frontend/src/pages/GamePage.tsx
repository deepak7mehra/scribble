import React, { useEffect, useState } from 'react'

import { useSocket } from '../hooks/useSocket'
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';

export default function GamePage() {
    const [waiting,setWaiting] = useState<boolean>(true);
    const socket = useSocket();
    const navigate = useNavigate();

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

                if (data.status === "GAMEOVER"){
                    navigate("/")
                }

                if (data.status === "SEL_WORD"){
                    console.log("INside word")
                }
            }
        }
    },[socket]);

    if (socket===null) return <div>connecting ... </div>
  return (
    <div >
      {waiting && <div>waiting for user to join</div>}

      {!waiting && <div className='grid grid-cols-10'>
            
            <div className='col-span-6'> <Board socket={socket} />  </div>
            <div className='col-span-2'>chats</div>
        
            

        </div>}
    </div>
  )
}
