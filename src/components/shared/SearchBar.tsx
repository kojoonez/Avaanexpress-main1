'use client'

import { Search, X, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  isMobile?: boolean
  onClose?: () => void
  className?: string
  variant?: 'header' | 'hero'
}

export default function SearchBar({ 
  placeholder = 'Search for anything...', 
  isMobile = false,
  onClose,
  className = '',
  variant = 'header'
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus on mobile when opened
  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMobile])

  // Handle click outside to close on mobile
  useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, onClose])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      await router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      if (onClose) onClose()
      setQuery('') // Clear search after submission
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close on escape
    if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative w-full ${className}`}
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${
          variant === 'header'
            ? 'h-10 pl-10 pr-12 rounded-lg bg-gray-900/80'
            : 'pl-12 pr-24 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg'
        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all`}
        aria-label="Search"
      />
      
      <Search 
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          variant === 'header' ? 'text-gray-400' : 'text-white/60'
        } pointer-events-none`}
        size={variant === 'header' ? 18 : 20}
      />

      {/* Clear button - show when there's input */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            variant === 'header'
              ? 'right-12'
              : 'right-24'
          } text-gray-400 hover:text-white p-1 focus:outline-none focus:text-white transition-colors`}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      {/* Submit button - show on hero variant or when focused on header */}
      {(variant === 'hero' || (variant === 'header' && (isFocused || query))) && (
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            variant === 'header'
              ? 'right-2 px-2 py-1 text-sm'
              : 'right-2 px-4 py-2'
          } bg-primary-blue hover:bg-secondary-blue disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-gray-900`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {variant === 'hero' && 'Searching...'}
            </>
          ) : (
            variant === 'hero' ? 'Search' : <Search size={14} />
          )}
        </button>
      )}

      {/* Mobile close button */}
      {isMobile && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-2 focus:outline-none focus:text-white transition-colors"
        >
          Cancel
        </button>
      )}
    </form>
  )
} 