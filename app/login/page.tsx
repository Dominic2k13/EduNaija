"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // runs only in the browser
    const stored = localStorage.getItem("username");
    setUsername(stored);
  }, []);
  // const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });
  // const router = useRouter();
  function onSubmit() {
    if (email === "" || !email.includes("@")) {
      setErrors((errors) => ({ ...errors, email: "Enter a valid email" }));
      return;
    }
    if (password === "" || password.length < 6) {
      setErrors((errors) => ({
        ...errors,
        password: "Password must be at least 6 characters",
      }));
      return;
    }
    // if (username === "" || username.length < 3) {
    //   setErrors((errors) => ({
    //     ...errors,
    //     username: "Username must be at least 3 characters",
    //   }));
    //   return;
    // }
    // localStorage.setItem("username", username);
    // console.log(email, password);
    if (!username) {
      // router.push("/signup");
      setErrors((errors) => ({
        ...errors,
        username: "This account does not exist, please signup",
      }));
      return;
    }
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue learning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((errors) => ({ ...errors, email: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.email}</p>
          </div>
          {/* <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((errors) => ({ ...errors, username: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.username}</p>
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((errors) => ({ ...errors, password: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.password}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <p className="text-xs text-red-500">{errors.username}</p>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
