import React from 'react'

export default function MessageItem({message, receiverId, shakeClass, user}) {
  const  chatClass = (receiverId === user.id || receiverId === user.salon_id) ? "message-send": "message-receive"
  return (
    <div className={`message-text ${chatClass} ${shakeClass}`}>
      <span>{message}</span>
    </div>
  )
}
