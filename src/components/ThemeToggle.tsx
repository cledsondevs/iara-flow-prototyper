import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "light") return <Sun className="h-4 w-4" />
    if (theme === "dark") return <Moon className="h-4 w-4" />
    return <Sun className="h-4 w-4" />
  }

  const getTooltip = () => {
    if (theme === "light") return "Modo escuro"
    if (theme === "dark") return "Modo sistema"
    return "Modo claro"
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      title={getTooltip()}
      className="text-muted-foreground hover:text-foreground"
    >
      {getIcon()}
    </Button>
  )
}