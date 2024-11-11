import Image from 'next/image'
import { signUpAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import AuthLayout from '@/components/Layouts/AuthLayout'

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
      <form className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Sign up</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Already have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/login">
              Sign in
            </Link>
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
            </div>
            <FormMessage message={searchParams} />
          </div>
        </form>
    </AuthLayout>
  )
}