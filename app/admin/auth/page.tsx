"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export default function AdminLoginForm () {

    const router = useRouter();
    const onLogin = async (data:FormData) =>{
        try{
            const res = await signIn("credentials",{
                email: data.get("email"),
                password: data.get("password"),
                redirect: false
            });
            if(res?.error)
            {
                toast.error("Can't login, check your email or password!")
            }
            else {
                router.push("/admin");
                toast.success("Login success!")
            }
        }
        catch(error)
        {
            toast.error("Can't login, check your email or password!")
        }
    }
  return ( 
    <div className='flex items-center justify-center min-h-screen'>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={onLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
          </div>
          <Button type="submit" className="w-full mt-3">
          Login
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
