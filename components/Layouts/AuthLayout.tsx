import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Metadata } from 'next'
import { cn } from "@/lib/utils"
import { buttonVariants } from '../ui/button'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type Props = {}


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth()
  if (session?.user) {
    redirect('/')
  }

  return (
    <>

      <div className="container relative flex  min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <Image
            src="https://picsum.photos/800"
            alt="Authentication"
            className='z-0 object-cover'
            fill
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Riziki Millers
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

            {children}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout