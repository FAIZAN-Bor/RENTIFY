"use client"
import { useTranslation } from "@/hooks/useTranslation"

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useTranslation()

  return (
    <select
      value={lang}
      onChange={e => changeLanguage(e.target.value)}
      className="border rounded px-2 py-1 text-sm bg-white text-zinc-700"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
} 