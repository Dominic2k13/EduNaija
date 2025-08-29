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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });
  const router = useRouter();

  function onSubmit() {
    let valid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: "",
    };

    if (!firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }
    if (!email || !email.includes("@")) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    // if (!agree) {
    //   newErrors.agree = "You must agree to the terms";
    //   valid = false;
    // }

    setErrors(newErrors);

    if (!valid) return;

    localStorage.setItem("username", username);
    router.push("/dashboard");
  }

  console.log(errors);
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join thousands of students excelling in their exams
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((errors) => ({ ...errors, firstName: "" }));
                }}
              />
              <p className="text-xs text-red-500">{errors.firstName}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((errors) => ({ ...errors, lastName: "" }));
                }}
              />
              <p className="text-xs text-red-500">{errors.lastName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((errors) => ({ ...errors, email: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.email}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((errors) => ({ ...errors, username: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.username}</p>
            {/* <Label htmlFor="email">Email</Label> */}
            {/* <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((errors) => ({ ...errors, email: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.email}</p> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((errors) => ({ ...errors, password: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.password}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((errors) => ({ ...errors, confirmPassword: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={onSubmit}
          >
            Create Account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
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
