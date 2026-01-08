import MessageCarousel from "@/components/MessageCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 

export default function Home() {
  return (
    <main className="px-16 pt-12 bg-[#f8f9fa]">
      <div className="flex justify-between items-start">
        <div className="w-1/2 mt-12">
          <h1 className="text-6xl leading-snug font-light">Let the <span className="text-5xl bg-zinc-700 text-[#f8f9fa] px-6 py-1 rounded-2xl font-extrabold">unsaid.</span> speak</h1>
          <p className="text-3xl font-extralight mt-2">Anonymous messages for words left unspoken</p>

          <Link href="/sign-up"><Button className="mt-8" variant="unsaid">Get Started</Button></Link>

          <div className="mt-5 w-full">
            <MessageCarousel />
          </div>
        </div>
        <div className="h-full">
          <img className="h-full w-full" src="/unsaidasset05.png" alt="unsaid home" />
        </div>
      </div>
    </main>
  );
}
