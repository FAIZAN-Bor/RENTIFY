"use client"
import { useTranslation } from "@/hooks/useTranslation"
import { useEffect } from "react"

export default function LangHtml({ children }: { children: React.ReactNode }) {
  const { lang } = useTranslation()
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])
  return <>{children}</>
} 