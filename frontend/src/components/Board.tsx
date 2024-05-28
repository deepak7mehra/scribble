import React, { useEffect, useRef } from 'react'




export default function Board({socket}:{socket: WebSocket}) {
  const ref =  useRef<HTMLCanvasElement>(null);
  var canvasPressed : boolean = false;
  
  var ctx:CanvasRenderingContext2D;
  useEffect(()=>{
    if (ref.current){
       // @ts-ignore
      ctx =  ref.current.getContext("2d");
      ctx.lineWidth = 2;
    }
    
    
},[]);

socket.onmessage = (x)=>{
  const message = JSON.parse(x.data);
  if (message.type === "DRAW"){
    
      ctx.lineTo(message.x, message.y);
      ctx.moveTo(message.x, message.y);
      ctx.stroke();
      
  }

  else if  (message.type === "PENDOWN"){
    canvasPressed = true;
    ctx.beginPath();
    ctx.moveTo(message.x, message.y);
  }

  else if (message.type === "PENUP"){
    canvasPressed = false;
  }

  else if (message.type ==="CHANGEERASER"){
    ctx.lineWidth = 25;
    ctx.strokeStyle = "white";
  }

  else if (message.type === "CHANGEPENCIL"){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
  }

  else {
    
  }
}


function handleMouseDown(evt: any){


  socket.send(JSON.stringify({
    type:"PENDOWN",
    x:evt.clientX,
    y:evt.clientY
  }))
        
  /* canvasPressed = true;
  ctx.beginPath();
  ctx.moveTo(evt.clientX, evt.clientY);
   */
}

function handleMouseUp(evt : any){



  socket.send(JSON.stringify({
    type:"PENUP"
  }))
  
  /* canvasPressed = false; */
  
}

function handleMouseMove(evt : any){
  console.log("mouse move has been done")
  if (canvasPressed) {
      /* ctx.lineTo(evt.clientX, evt.clientY);
      ctx.moveTo(evt.clientX, evt.clientY);
      ctx.stroke(); */
      socket.send(JSON.stringify({
        type : "DRAW",
        x:evt.clientX,
        y:evt.clientY
      }))
      
  }
}

function handleEraser(){

  socket.send(JSON.stringify({
    type:"CHANGEERASER"
  }))

  /* ctx.lineWidth = 25;
  ctx.strokeStyle = "white"; */
  

}

function handlePencil(){

  socket.send(JSON.stringify({
    type:"CHANGEPENCIL"
  }))

  /* ctx.strokeStyle = "black";
  ctx.lineWidth = 2; */
}

/* function startGame(){
  socket.send(JSON.stringify({
    type:"INIT_GAME"
  }))
} */

  return (
    <div className='border-3 border-black'>
      <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="border-2 border-black" ref={ref} width="500" height="500" >
        hi there
    </canvas>

    <div className="flex gap-5 p-5">

    <button onClick={handleEraser} >eraser</button>
    <button onClick={handlePencil} >pencil</button>
    {/* <button className='border-2 border-black' onClick={startGame}>start game </button> */}
    </div>

    </div>
  )
}
