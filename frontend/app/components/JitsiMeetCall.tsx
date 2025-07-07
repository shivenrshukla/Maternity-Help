"use client"

import { useEffect, useState } from "react"

export default function JitsiMeetCall() {
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    // Generate a unique room name on mount
    const generatedRoom = "NurtureWell-" + Date.now()
    setRoomName(generatedRoom)
  }, [])

  if (!roomName) return <p>Loading room...</p>

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold text-center mb-4">Live Video Consultation</h1>
      <iframe
  src={`https://meet.jit.si/${roomName}`}
  allow="camera; microphone; fullscreen; display-capture"
  style={{
    width: "100%",
    height: "500px",
    border: "0",
    borderRadius: "12px",
  }}
  title="Jitsi Video Call"
/>

    </div>
  )
}
