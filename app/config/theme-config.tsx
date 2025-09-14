"use client"

import type React from "react"

// Theme Configuration
// Change the theme below to customize colors throughout the site

import { useState, createContext, useContext } from "react"

export type ThemeType = "default" | "purple" | "blue" | "green" | "red" | "orange"

export const themeConfig = {
  currentTheme: "default" as ThemeType, // Change this to switch themes

  themes: {
    default: {
      name: "Default Gray",
      squares: {
        from: "from-gray-400",
        to: "to-gray-600",
      },
      text: {
        primary: "text-gray-400",
        secondary: "text-gray-300",
        muted: "text-gray-500",
      },
      gradients: {
        primary: "from-gray-700 to-gray-800",
        primaryHover: "from-gray-600 to-gray-700",
        apk: "from-green-700 to-green-800",
        apkHover: "from-green-600 to-green-700",
        ios: "from-blue-700 to-blue-800",
        iosHover: "from-blue-600 to-blue-700",
      },
      shadows: {
        primary: "shadow-gray-500/30",
        apk: "shadow-green-500/30",
        ios: "shadow-blue-500/30",
      },
    },
    purple: {
      name: "Purple Theme",
      squares: {
        from: "from-purple-400",
        to: "to-purple-600",
      },
      text: {
        primary: "text-purple-400",
        secondary: "text-purple-300",
        muted: "text-purple-500",
      },
      gradients: {
        primary: "from-purple-700 to-purple-800",
        primaryHover: "from-purple-600 to-purple-700",
        apk: "from-emerald-700 to-emerald-800",
        apkHover: "from-emerald-600 to-emerald-700",
        ios: "from-indigo-700 to-indigo-800",
        iosHover: "from-indigo-600 to-indigo-700",
      },
      shadows: {
        primary: "shadow-purple-500/30",
        apk: "shadow-emerald-500/30",
        ios: "shadow-indigo-500/30",
      },
    },
    blue: {
      name: "Blue Theme",
      squares: {
        from: "from-blue-400",
        to: "to-blue-600",
      },
      text: {
        primary: "text-blue-400",
        secondary: "text-blue-300",
        muted: "text-blue-500",
      },
      gradients: {
        primary: "from-blue-700 to-blue-800",
        primaryHover: "from-blue-600 to-blue-700",
        apk: "from-teal-700 to-teal-800",
        apkHover: "from-teal-600 to-teal-700",
        ios: "from-cyan-700 to-cyan-800",
        iosHover: "from-cyan-600 to-cyan-700",
      },
      shadows: {
        primary: "shadow-blue-500/30",
        apk: "shadow-teal-500/30",
        ios: "shadow-cyan-500/30",
      },
    },
    green: {
      name: "Green Theme",
      squares: {
        from: "from-green-400",
        to: "to-green-600",
      },
      text: {
        primary: "text-green-400",
        secondary: "text-green-300",
        muted: "text-green-500",
      },
      gradients: {
        primary: "from-green-700 to-green-800",
        primaryHover: "from-green-600 to-green-700",
        apk: "from-emerald-700 to-emerald-800",
        apkHover: "from-emerald-600 to-emerald-700",
        ios: "from-teal-700 to-teal-800",
        iosHover: "from-teal-600 to-teal-700",
      },
      shadows: {
        primary: "shadow-green-500/30",
        apk: "shadow-emerald-500/30",
        ios: "shadow-teal-500/30",
      },
    },
    red: {
      name: "Red Theme",
      squares: {
        from: "from-red-400",
        to: "to-red-600",
      },
      text: {
        primary: "text-red-400",
        secondary: "text-red-300",
        muted: "text-red-500",
      },
      gradients: {
        primary: "from-red-700 to-red-800",
        primaryHover: "from-red-600 to-red-700",
        apk: "from-orange-700 to-orange-800",
        apkHover: "from-orange-600 to-orange-700",
        ios: "from-pink-700 to-pink-800",
        iosHover: "from-pink-600 to-pink-700",
      },
      shadows: {
        primary: "shadow-red-500/30",
        apk: "shadow-orange-500/30",
        ios: "shadow-pink-500/30",
      },
    },
    orange: {
      name: "Orange Theme",
      squares: {
        from: "from-orange-400",
        to: "to-orange-600",
      },
      text: {
        primary: "text-orange-400",
        secondary: "text-orange-300",
        muted: "text-orange-500",
      },
      gradients: {
        primary: "from-orange-700 to-orange-800",
        primaryHover: "from-orange-600 to-orange-700",
        apk: "from-amber-700 to-amber-800",
        apkHover: "from-amber-600 to-amber-700",
        ios: "from-yellow-700 to-yellow-800",
        iosHover: "from-yellow-600 to-yellow-700",
      },
      shadows: {
        primary: "shadow-orange-500/30",
        apk: "shadow-amber-500/30",
        ios: "shadow-yellow-500/30",
      },
    },
  },
}

// Helper function to get current theme
export const getCurrentTheme = () => themeConfig.themes[themeConfig.currentTheme]

// Create a context for the theme
const ThemeContext = createContext({
  currentTheme: themeConfig.currentTheme,
  setCurrentTheme: (theme: ThemeType) => {},
  getCurrentTheme: getCurrentTheme,
})

// Create a provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(themeConfig.currentTheme)

  const value = {
    currentTheme,
    setCurrentTheme,
    getCurrentTheme: () => themeConfig.themes[currentTheme],
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Create a custom hook to use the theme
export const useTheme = () => {
  return useContext(ThemeContext)
}
