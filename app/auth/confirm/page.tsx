"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { supabase } from "@/lib/supabase/client"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ConfirmPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get("token_hash")
        const type = searchParams.get("type")

        if (!token_hash || type !== "email") {
          setStatus("error")
          setMessage("Invalid confirmation link")
          return
        }

        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        })

        if (error) {
          setStatus("error")
          setMessage(error.message || "Failed to confirm email")
          return
        }

        if (data.user) {
          setStatus("success")
          setMessage("Email confirmed successfully!")

          // Redirect to setup profile after a short delay
          setTimeout(() => {
            router.push("/auth/setup-profile")
          }, 2000)
        }
      } catch (error: any) {
        setStatus("error")
        setMessage(error.message || "An unexpected error occurred")
      }
    }

    handleEmailConfirmation()
  }, [searchParams, router])

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      case "success":
        return <CheckCircle className="w-12 h-12 text-green-600" />
      case "error":
        return <XCircle className="w-12 h-12 text-red-600" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "text-blue-600"
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/highscore-logo-final.png"
                alt="HighScore Logo"
                width={64}
                height={64}
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold text-blue-900">HighScore</span>
          </div>
          <CardTitle className="text-2xl">Email Confirmation</CardTitle>
          <CardDescription>
            {status === "loading" && "Confirming your email address..."}
            {status === "success" && "Your email has been confirmed!"}
            {status === "error" && "There was an issue confirming your email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">{getStatusIcon()}</div>

          <p className={`text-lg font-medium ${getStatusColor()}`}>{message}</p>

          {status === "success" && (
            <div className="space-y-4">
              <p className="text-gray-600">Redirecting you to complete your profile...</p>
              <Button
                onClick={() => router.push("/auth/setup-profile")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue to Profile Setup
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <p className="text-gray-600">Please try signing up again or contact support if the issue persists.</p>
              <div className="flex gap-2">
                <Button onClick={() => router.push("/auth/register")} variant="outline" className="flex-1">
                  Sign Up Again
                </Button>
                <Button onClick={() => router.push("/auth/login")} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
