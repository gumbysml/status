"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme, type ThemeType } from "../config/theme-config"

interface ThemeSwitcherProps {
  isMobile?: boolean
}

export default function ThemeSwitcher({ isMobile = false }: ThemeSwitcherProps) {
  const { currentTheme, setCurrentTheme, getCurrentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const theme = getCurrentTheme()

  const themes: { key: ThemeType; name: string; color: string }[] = [
    { key: "default", name: "Gray", color: "bg-gray-500" },
    { key: "purple", name: "Purple", color: "bg-purple-500" },
    { key: "blue", name: "Blue", color: "bg-blue-500" },
    { key: "green", name: "Green", color: "bg-green-500" },
    { key: "red", name: "Red", color: "bg-red-500" },
    { key: "orange", name: "Orange", color: "bg-orange-500" },
  ]

  const handleThemeChange = (themeKey: ThemeType) => {
    setCurrentTheme(themeKey)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-transparent border-gray-600 ${theme.text.secondary} hover:bg-gray-800/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 transform-gpu`}
      >
        <svg className={`${isMobile ? "w-3 h-3 mr-1" : "w-4 h-4 mr-2"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 18.5A6.5 6.5 0 1 1 18.5 12 6.508 6.508 0 0 1 12 18.5zM12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" />
        </svg>
        {isMobile ? "Theme" : "Themes"}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Theme Menu */}
          <Card
            className={`absolute ${
              isMobile ? "right-0 top-full mt-2" : "right-0 top-full mt-2"
            } z-50 bg-gray-800/95 backdrop-blur-sm border-gray-700 p-4 min-w-[200px] shadow-2xl shadow-black/50`}
          >
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-white mb-2">Choose Theme</h3>
              <div className={`w-full h-px bg-gradient-to-r ${theme.squares.from} ${theme.squares.to}`}></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.key}
                  onClick={() => handleThemeChange(themeOption.key)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 ${
                    currentTheme === themeOption.key ? "bg-gray-700/70 ring-1 ring-gray-500" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${themeOption.color} shadow-lg ${
                      currentTheme === themeOption.key ? "ring-2 ring-white/50" : ""
                    }`}
                  ></div>
                  <span className="text-sm text-gray-300 font-medium">{themeOption.name}</span>
                  {currentTheme === themeOption.key && (
                    <svg className="w-3 h-3 text-green-400 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">Theme will be saved automatically</p>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
