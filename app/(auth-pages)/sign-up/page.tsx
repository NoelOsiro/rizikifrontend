import Image from 'next/image'
import { signUpAction } from "@/app/actions"
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SmtpMessage } from "../smtp-message"

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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-primary justify-center items-center p-6">
        <div className="text-center">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Riziki Flour Millers Logo"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white mb-2">Riziki Flour Millers</h1>
          <p className="text-xl text-white">Quality flour for your daily needs</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Sign up</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Already have an account?{" "}
            <Link className="text-primary font-medium hover:underline" href="/sign-in">
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
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
      <SmtpMessage />
    </div>
  )
}