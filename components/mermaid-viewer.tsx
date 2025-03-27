"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MermaidViewerProps {
  code: string
}

export function MermaidViewer({ code }: MermaidViewerProps) {
  const [mermaidCode, setMermaidCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
      securityLevel: "loose",
    })

    // Extract mermaid code from markdown-style code blocks
    const extractedCode = extractMermaidCode(code)
    setMermaidCode(extractedCode)

    if (extractedCode && mermaidRef.current) {
      try {
        mermaidRef.current.innerHTML = ""
        mermaid
          .render("mermaid-diagram", extractedCode)
          .then(({ svg }) => {
            if (mermaidRef.current) {
              mermaidRef.current.innerHTML = svg
            }
          })
          .catch((err) => {
            console.error("Mermaid rendering error:", err)
            setError("Failed to render diagram. Please check your syntax.")
          })
      } catch (err) {
        console.error("Mermaid error:", err)
        setError("Failed to render diagram. Please check your syntax.")
      }
    }
  }, [code])

  // Function to extract mermaid code from markdown-style code blocks
  const extractMermaidCode = (text: string): string => {
    const mermaidRegex = /```mermaid\s*([\s\S]*?)```/
    const match = text.match(mermaidRegex)
    return match ? match[1].trim() : text
  }

  return (
    <Tabs defaultValue="diagram" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="diagram">Diagram</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="diagram" className="p-4 bg-white dark:bg-gray-800 rounded-md">
        {error ? (
          <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>
        ) : (
          <div ref={mermaidRef} className="flex justify-center overflow-auto"></div>
        )}
      </TabsContent>

      <TabsContent value="code" className="p-4 bg-muted rounded-md">
        <pre className="whitespace-pre-wrap overflow-auto">{code}</pre>
      </TabsContent>
    </Tabs>
  )
}

