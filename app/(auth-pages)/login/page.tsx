
import { signIn } from "@/auth";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {

  const handleLogin = async () => {
    "use server"
    await signIn('google');
  }

  return (
    <AuthLayout>
      <div className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <form className="flex flex-col gap-2 [&>input]:mb-3 mt-8" action={handleLogin}>  
        <Button type="submit" className="bg-primary text-white">
          Sign in with Google
        </Button>
      </form>
    </div>
    </AuthLayout>
    
  );
}
