"use client"

// This is a simplified version of the toast hook
// In a real app, you would use a proper toast library

import { useState } from "react"

type Toast = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastState = {
  toasts: Toast[]
}

export function useToast() {
  const [state, setState] = useState<ToastState>({
    toasts: [],
  })

  const toast = (toast: Toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    setState((prev) => ({
      toasts: [...prev.toasts, { id, ...toast }],
    }))

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setState((prev) => ({
        toasts: prev.toasts.filter((t) => t.id !== id),
      }))
    }, 5000)

    return id
  }

  const dismiss = (id: string) => {
    setState((prev) => ({
      toasts: prev.toasts.filter((t) => t.id !== id),
    }))
  }

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  }
}

