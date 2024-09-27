"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"

import { Metadata } from "next"

import "@/styles/globals.css"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
