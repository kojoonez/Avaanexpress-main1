'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fi', name: 'Suomi' },
  { code: 'sv', name: 'Svenska' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  
  const handleLanguageChange = (languageCode: string) => {
    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', languageCode)
    // Reload the page with the new language
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">Language</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card-background border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                dir={language.dir}
              >
                <span className="w-6">{language.code.toUpperCase()}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 