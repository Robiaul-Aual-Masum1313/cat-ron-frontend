'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegesterPage() {
  const [enable,setEnable] = useState(true)
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    // console.log(password);
    
    if(/^(?=.*[A-Z])(?=.*[a-z])(?=\S+$).{6,}$/.test(password)){
      setEnable(false)
      
    }else{
      setEnable(true)
    }
  }
  const handleGoogleSign = async () => {
    const data = await signIn.social({
      provider: 'google'
    })
  }
  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries()) as{name:string,email:string,image:string,password:string}
    const {data,error} = await signUp.email({
      ...userData,
      callbackURL: '/'
    })
    if(data){
      redirect('/')
    }
    if(error){
      console.log('from from ' ,error);
      
    }
    
  }
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-105">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-black">Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="Pic">Image url</FieldLabel>
                  <Input id="Pic" name="image" type="text" required />
                  <FieldDescription>Give your image url link</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input onChange={validatePassword} name="password" id="password" type="password" required />
                  <FieldDescription>
                    Must be at least 6 characters long. At list one Uppercase and one Lower case letter
                  </FieldDescription>
                </Field>

                <FieldGroup>
                  <Field>
                    <Button disabled={enable} type="submit">Create Account</Button>
                    <Button onClick={handleGoogleSign} variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <a href="/login">Sign in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
