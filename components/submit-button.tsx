'use client'

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText?: string
  children: React.ReactNode
}

export function SubmitButton({ pendingText, children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  )
}