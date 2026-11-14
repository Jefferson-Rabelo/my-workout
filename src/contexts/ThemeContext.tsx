import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'lime' | 'pink'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const THEME_STORAGE_KEY = 'my-workout:theme'
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function readStoredTheme(): Theme {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'pink' ? 'pink' : 'lime'
  } catch {
    return 'lime'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setCurrentTheme] = useState<Theme>(readStoredTheme)

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme !== 'lime' && nextTheme !== 'pink') return
    setCurrentTheme((currentTheme) => currentTheme === nextTheme ? currentTheme : nextTheme)
  }, [])

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // A preferência indisponível não deve impedir o uso do aplicativo.
    }
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// The provider and its consumer hook form one public context API.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) throw new Error('useTheme deve ser usado dentro de ThemeProvider.')
  return context
}
