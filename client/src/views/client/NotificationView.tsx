"use client"

import React, { useEffect } from "react"

const NotificationView = () => {
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const ws = new WebSocket(`ws://localhost:5001?token=${token}`)

      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data)
        console.log("Received notification:", notification)
      }

      ws.onopen = () => {
        console.log("WebSocket connection opened")
      }

      ws.onclose = () => {
        console.log("WebSocket connection closed")
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }

      // Cleanup on component unmount
      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close()
        }
      }
    } else {
      const ws = new WebSocket(`ws://localhost:5001`)
      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data)
        console.log("Received notification:", notification)
      }
    }
  }, [])

  return (
    <div>
      <h1>Notification Application</h1>
    </div>
  )
}

export default NotificationView
