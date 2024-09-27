import React from "react"

import { useRouter } from "next/navigation"

interface Props {}

const HomeLandingView: React.FC<Props> = () => {
  const router = useRouter()

  const user = null // TODO: Fetch user details

  return (
    <>
      <div className="center h-screen space-x-4">
        {user ? (
          <>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => router.push("/admin")}
            >
              Go to Admin Page
            </button>
            <button
              className="rounded bg-green-500 px-4 py-2 text-white"
              onClick={() => router.push("/notifications")}
            >
              View All Notifications
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => {
                // TODO: Login auth modal or something
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default HomeLandingView
