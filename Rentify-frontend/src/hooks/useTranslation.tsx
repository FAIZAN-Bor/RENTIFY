"use client"

import React, { useState, useEffect, useCallback, useContext, createContext } from "react"

const LANG_KEY = "lang"
const DEFAULT_LANG = "en"
const SUPPORTED_LANGS = ["en", "es"]

export type TranslationResources = Record<string, any>

interface TranslationContextType {
  lang: string
  resources: TranslationResources
  loading: boolean
  changeLanguage: (lang: string) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

function getInitialLang() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored
    const browserLang = navigator.language.slice(0, 2)
    if (SUPPORTED_LANGS.includes(browserLang)) return browserLang
  }
  return DEFAULT_LANG
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string>(getInitialLang())
  const [resources, setResources] = useState<TranslationResources>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/locales/${lang}/common.json`)
      .then((res) => res.json())
      .then((data) => setResources(data))
      .finally(() => setLoading(false))
  }, [lang])

  const changeLanguage = useCallback((newLang: string) => {
    if (SUPPORTED_LANGS.includes(newLang)) {
      setLang(newLang)
      localStorage.setItem(LANG_KEY, newLang)
    }
  }, [])

  const t = useCallback(
    (key: string): any => {
      const value = key.split(".").reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), resources)
      return value !== undefined ? value : key
    },
    [resources]
  )

  return (
    <TranslationContext.Provider value={{ lang, resources, loading, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(TranslationContext)
  if (!ctx) throw new Error("useTranslation must be used within a TranslationProvider")
  return ctx
} 