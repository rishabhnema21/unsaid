"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import {User} from "next-auth"
import { Button } from "./ui/button"

const Navigation = () => {

    const {data: session} = useSession();
    const user:User = session?.user as User

  return (
    <header className="flex justify-center items-center bg-[#f8f9fa]">
        <nav className="w-[50vw] px-5 py-1 rounded-xl shadow-lg mt-4 flex justify-between items-center">
        <div className="h-15">
            <Link href="/">
                <img className="h-full w-full" src="/Logo.png" alt="unsaid logo" />
            </Link>
        </div>

        <div>
            {
                session ? (
                    <Button onClick={() => signOut()}>Sign Out</Button>
                ) : (
                    <Link href="/sign-in">
                        <Button>
                            Sign In
                        </Button>
                    </Link>
                )
            }
        </div>
    </nav>
    </header>
  )
}

export default Navigation