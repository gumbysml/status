"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../config/theme-config"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const { getCurrentTheme } = useTheme()
  const theme = getCurrentTheme()

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2.5 // Increment by 2.5% every 100ms to reach 100% in 4 seconds
      })
    }, 100)

    // Dots animation for "Loading..."
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    // Complete loading after 4 seconds
    const loadingTimer = setTimeout(() => {
      onLoadingComplete()
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
      clearTimeout(loadingTimer)
    }
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      {/* Animated Background Squares */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div
              className={`bg-gradient-to-br ${theme.squares.from} ${theme.squares.to} transform rotate-45`}
              style={{
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo with glow effect - Text Version */}
        <div className="mb-8 relative">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} rounded-full blur-3xl opacity-30 scale-150 animate-pulse`}
          ></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                MIST
              </h1>
              <div
                className={`w-20 h-1 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} mx-auto mt-4 animate-pulse`}
              ></div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            MIST
          </h1>
          <div
            className={`w-16 h-1 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} mx-auto animate-pulse`}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <p className={`text-xl ${theme.text.primary} font-medium`}>Loading{dots}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-gray-800/50 rounded-full h-2 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${theme.gradients.primary} transition-all duration-300 ease-out relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <p className={`text-sm ${theme.text.secondary} mt-2 font-mono`}>{Math.round(progress)}%</p>
        </div>

        {/* Subtitle */}
        <div className="mt-8">
          <p className={`text-sm ${theme.text.muted} max-w-md mx-auto leading-relaxed`}>
            Initializing the most advanced Roblox executor...
          </p>
        </div>
      </div>
    </div>
  )
}
