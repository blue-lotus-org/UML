"use client"

import Link from "next/link"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          UML AI Generator
        </Link>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant={pathname === "/settings" ? "default" : "ghost"} size="icon" asChild>
            <Link href="/settings" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

