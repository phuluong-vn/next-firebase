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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ICreateAdminInput } from '@/features/managers/type'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

export default function AdminLoginForm () {

    const {
        control,
        handleSubmit,
        formState: {isValid, errors}} = useForm<ICreateAdminInput>({
            mode:'onBlur',
        defaultValues:{
            email:"",
            password:""
        }
    });
    const router = useRouter();
    const onLogin: SubmitHandler<ICreateAdminInput> = async (data) => {
  try {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (res?.error) {
      toast.error("Can't login, check your email or password!");
    } else {
      router.push("/admin");
      toast.success("Login success!");
    }
  } catch (e) {
    toast.error("Can't login, check your email or password!");
  }
};
    
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
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller control={control} name='email' 
              rules={{required:{value:true, message:"Email is required"},
                pattern: {value: /^\S+@\S+\.\S+$/, message: "Email is invalid"}}} 
              render={({field, fieldState})=>(
                  <Field data-invalid={fieldState.invalid}>
                <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
              />
              {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  </Field>   
             )}/>
             
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
               <Controller control={control} name='password' 
               rules={{required:{value:true, message:"Password is required"},
                minLength:{value: 6, message: "Password must be at least 6 characters"}}}
               render={({field, fieldState})=>(
                 <Field data-invalid={fieldState.invalid}>
                <Input
                id="password"
                type="password"
                 aria-invalid={fieldState.invalid}
                {...field}
                placeholder="******"
              />
              {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
             )}/>
              
            </div>
          </div>
          <Button type="submit" className="w-full mt-3" disabled={!isValid}>
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
