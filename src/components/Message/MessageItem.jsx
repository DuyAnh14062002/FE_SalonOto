import React from 'react'

export default function MessageItem({message, receiverId, shakeClass, user, isMessage, img}) {
  const  chatClass = (receiverId === user.id || receiverId === user.salon_id) ? "message-send": "message-receive"
  console.log("isMessage : ", isMessage)
  return (
    <>
    {isMessage === true ? (<div className={`message-text ${chatClass} ${shakeClass}`}>
        <span>{message.includes("http") ? <a href={message}>{message}</a> : message}</span>
      </div>) : ( <div  className={`message-image ${shakeClass}`}>
        <div className={`image-message ${chatClass} `} style={{backgroundImage : `url(${img})`}}>
      
        </div>
      </div>)}
    </>
  )
}
