import { Check, Moon, Sun } from 'lucide-react'
import { Theme, useTheme } from 'remix-themes'

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export function ThemeToggle() {
  const [theme, setTheme, metadata] = useTheme()

  const THEME_OPTIONS = [
    { label: 'Light', value: Theme.LIGHT },
    { label: 'Dark', value: Theme.DARK },
    { label: 'System', value: null },
  ]

  const isSelected = (value: Theme | null) => {
    if (value === null) {
      return metadata.definedBy === 'SYSTEM'
    }
    return theme === value && metadata.definedBy === 'USER'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map(({ label, value }) => (
          <DropdownMenuItem key={label} onClick={() => setTheme(value)}>
            <span className="flex items-center gap-2">
              {label}
              {isSelected(value) && <Check className="h-4 w-4" />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
