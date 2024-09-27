// In your Next.js app directory, e.g., app/register/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const RegisterView = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        return
      }

      router.push("/login")
    } catch (err) {
      console.error(err)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="mx-auto max-w-md pt-24">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            placeholder="John Doe"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterView
