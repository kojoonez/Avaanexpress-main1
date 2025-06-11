'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'fi' | 'sv' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  dir: 'ltr' | 'rtl'
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (['en', 'fi', 'sv', 'ar'].includes(browserLang)) {
        setLanguage(browserLang as Language)
        localStorage.setItem('preferredLanguage', browserLang)
      }
    }
  }, [])

  useEffect(() => {
    // Load translations for the selected language
    const loadTranslations = async () => {
      try {
        const messages = await import(`@/messages/${language}.json`)
        setTranslations(messages.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to English if translation file not found
        const enMessages = await import('@/messages/en.json')
        setTranslations(enMessages.default)
      }
    }

    loadTranslations()
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('preferredLanguage', lang)
    // Update document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value?.[k] === undefined) {
        console.warn(`Translation missing for key: ${key}`)
        return key
      }
      value = value[k]
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value for key ${key} is not a string`)
      return key
    }

    return value
  }

  return (
    <LanguageContext.Provider 
      value={{
        language,
        setLanguage: handleSetLanguage,
        dir: language === 'ar' ? 'rtl' : 'ltr',
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 