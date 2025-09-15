"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { apkConfig } from "./config/apk-config"
import { downloadConfig } from "./config/download-config"
import { getCurrentTheme } from "./config/theme-config"
import { mobileConfig } from "./config/mobile-config"
import { ipaConfig } from "./config/ipa-config"
import { tutorialConfig } from "./config/tutlink"
import { maintenanceConfig } from "./config/maintenance-config"
import { releaseConfig } from "./config/release-config"
import LoadingScreen from "./components/loading-screen"
import MaintenanceScreen from "./components/maintenance-screen"

// Mobile Detection Hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Check immediately on mount if window is available
    if (typeof window !== "undefined") {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Device Detection Hook
function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "unknown">("unknown")

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("ios")
    } else if (/android/.test(userAgent)) {
      setDeviceType("android")
    } else {
      setDeviceType("unknown")
    }
  }, [])

  return deviceType
}

// 3D Squares Background Component
function BackgroundSquares() {
  const theme = getCurrentTheme()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div
            className={`bg-gradient-to-br ${theme.squares.from} ${theme.squares.to} transform rotate-45`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

// Mobile Warning Component
function MobileWarning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <BackgroundSquares />
      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 p-8 text-center max-w-md relative z-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">MIST</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          Sorry, mist is not available on mobile. Please try again on a desktop device!
        </p>
      </Card>
    </div>
  )
}

// Tutorial Section Component
function TutorialSection() {
  const theme = getCurrentTheme()

  if (!tutorialConfig.enabled) {
    return null
  }

  return (
    <section className="relative z-10 py-20 px-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {tutorialConfig.title}
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} mx-auto mb-6`}></div>
          <p className={`text-lg ${theme.text.primary} max-w-2xl mx-auto leading-relaxed`}>
            {tutorialConfig.description}
          </p>
        </div>

        {tutorialConfig.videoenabled && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 transform-gpu">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-900/50">
              <iframe
                src={tutorialConfig.videoUrl}
                title={tutorialConfig.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={tutorialConfig.allowFullscreen}
                style={{
                  border: "none",
                }}
              />
            </div>

            {tutorialConfig.duration && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className={`text-sm ${theme.text.secondary}`}>Duration: {tutorialConfig.duration}</span>
              </div>
            )}
          </Card>
        )}

        <div className="mt-8">
          <p className={`text-sm ${theme.text.muted}`}>
            Having trouble? Join our Discord community for support and tips!
          </p>
        </div>
      </div>
    </section>
  )
}

// Main Desktop Component
function DesktopSite() {
  const theme = getCurrentTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <BackgroundSquares />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold">
            <span className="text-white">GET</span>
            <span className="text-gray-400">MIST</span>
          </div>
          <div className="flex gap-4">
            <Link
              href={releaseConfig.released ? downloadConfig.downloadUrl : "#"}
              target={releaseConfig.released ? "_blank" : "_self"}
            >
              <Button
                disabled={!releaseConfig.released}
                className={`${
                  releaseConfig.released
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                    : "bg-gradient-to-r from-red-700 to-red-800 text-white cursor-not-allowed opacity-75"
                } border-0 transition-all duration-300 ${releaseConfig.released ? "hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20" : ""} transform-gpu`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                {releaseConfig.released ? "Download" : releaseConfig.disabledText}
              </Button>
            </Link>
            <Link href="https://discord.gg/dwWvUjraq4" target="_blank">
              <Button
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 transform-gpu"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Discord
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              MIST
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The most advanced Roblox executor with unparalleled performance and reliability. Experience seamless
              script execution like never before.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href={releaseConfig.released ? downloadConfig.downloadUrl : "#"}
              target={releaseConfig.released ? "_blank" : "_self"}
            >
              <Button
                size="lg"
                disabled={!releaseConfig.released}
                className={`${
                  releaseConfig.released
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                    : "bg-gradient-to-r from-red-700 to-red-800 text-white cursor-not-allowed opacity-75"
                } border-0 px-8 py-4 text-lg font-semibold transition-all duration-300 ${releaseConfig.released ? "hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/30" : ""} transform-gpu group`}
              >
                <span
                  className={`${releaseConfig.released ? "group-hover:scale-105" : ""} transition-transform duration-200`}
                >
                  {releaseConfig.released ? "Download MIST" : releaseConfig.disabledText}
                </span>
              </Button>
            </Link>

            <Link href="https://discord.gg/dwWvUjraq4" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/20 transform-gpu group"
              >
                <span className="group-hover:scale-105 transition-transform duration-200">Join Community</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/20 transform-gpu">
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Optimized for maximum performance with minimal resource usage.</p>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/20 transform-gpu">
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Safe</h3>
              <p className="text-gray-400">Built with security in mind, protecting your system and data.</p>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/20 transform-gpu">
              <h3 className="text-xl font-semibold text-white mb-3">Regular Updates</h3>
              <p className="text-gray-400">Constantly updated to ensure compatibility and new features.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <TutorialSection />

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">© 2025 GetMist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Mobile Site Component (when mobile is allowed)
function MobileSite() {
  const theme = getCurrentTheme()
  const deviceType = useDeviceType()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <BackgroundSquares />

      {/* Mobile Header */}
      <header className="relative z-10 p-4">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <span className="text-white">GET</span>
            <span className={theme.text.primary}>MIST</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={releaseConfig.released ? downloadConfig.downloadUrl : "#"}
              target={releaseConfig.released ? "_blank" : "_self"}
            >
              <Button
                size="sm"
                disabled={!releaseConfig.released}
                className={`${
                  releaseConfig.released
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                    : "bg-gradient-to-r from-red-700 to-red-800 text-white cursor-not-allowed opacity-75"
                } border-0 transition-all duration-300 ${releaseConfig.released ? "hover:scale-105" : ""} transform-gpu`}
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                {releaseConfig.released ? "Download" : "Not Released"}
              </Button>
            </Link>
            <Link href="https://discord.gg/dwWvUjraq4" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className={`bg-transparent border-gray-600 ${theme.text.secondary} hover:bg-gray-800/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 transform-gpu`}
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Discord
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              MIST
            </h1>
            <div className={`w-20 h-1 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} mx-auto mb-4`}></div>
            <p className={`text-sm ${theme.text.primary} leading-relaxed`}>
              The most advanced Roblox executor now available on mobile devices.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Android APK Button - Only show for Android devices */}
            {deviceType === "android" && apkConfig.enabled && (
              <Link
                href={releaseConfig.released ? apkConfig.downloadUrl : "#"}
                target={releaseConfig.released ? "_blank" : "_self"}
              >
                <Button
                  size="lg"
                  disabled={!releaseConfig.released}
                  className={`w-full ${
                    releaseConfig.released
                      ? `bg-gradient-to-r ${theme.gradients.apk} hover:${theme.gradients.apkHover} text-white border-0 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${theme.shadows.apk} transform-gpu group relative overflow-hidden`
                      : "bg-gradient-to-r from-red-700 to-red-800 text-white border-0 px-6 py-4 text-base font-semibold cursor-not-allowed opacity-75"
                  }`}
                >
                  {releaseConfig.released && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.637.637 0 0 0-.83-.22c-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
                    </svg>
                    <span
                      className={`${releaseConfig.released ? "group-hover:scale-105" : ""} transition-transform duration-200`}
                    >
                      {releaseConfig.released ? "Download APK" : releaseConfig.disabledText}
                    </span>
                  </div>
                </Button>
              </Link>
            )}

            {/* iOS IPA Button - Only show for iOS devices */}
            {deviceType === "ios" && ipaConfig.enabled && (
              <Link
                href={releaseConfig.released ? ipaConfig.downloadUrl : "#"}
                target={releaseConfig.released ? "_blank" : "_self"}
              >
                <Button
                  size="lg"
                  disabled={!releaseConfig.released}
                  className={`w-full ${
                    releaseConfig.released
                      ? `bg-gradient-to-r ${theme.gradients.ios} hover:${theme.gradients.iosHover} text-white border-0 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${theme.shadows.ios} transform-gpu group relative overflow-hidden`
                      : "bg-gradient-to-r from-red-700 to-red-800 text-white border-0 px-6 py-4 text-base font-semibold cursor-not-allowed opacity-75"
                  }`}
                >
                  {releaseConfig.released && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span
                      className={`${releaseConfig.released ? "group-hover:scale-105" : ""} transition-transform duration-200`}
                    >
                      {releaseConfig.released ? "Download IOS" : releaseConfig.disabledText}
                    </span>
                  </div>
                </Button>
              </Link>
            )}

            {/* Show both buttons if device type is unknown */}
            {deviceType === "unknown" && (
              <>
                {apkConfig.enabled && (
                  <Link
                    href={releaseConfig.released ? apkConfig.downloadUrl : "#"}
                    target={releaseConfig.released ? "_blank" : "_self"}
                  >
                    <Button
                      size="lg"
                      disabled={!releaseConfig.released}
                      className={`w-full ${
                        releaseConfig.released
                          ? `bg-gradient-to-r ${theme.gradients.apk} hover:${theme.gradients.apkHover} text-white border-0 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${theme.shadows.apk} transform-gpu group relative overflow-hidden`
                          : "bg-gradient-to-r from-red-700 to-red-800 text-white border-0 px-6 py-4 text-base font-semibold cursor-not-allowed opacity-75"
                      }`}
                    >
                      {releaseConfig.released && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      )}
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.637.637 0 0 0-.83-.22c-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
                        </svg>
                        <span
                          className={`${releaseConfig.released ? "group-hover:scale-105" : ""} transition-transform duration-200`}
                        >
                          {releaseConfig.released ? "Download APK" : releaseConfig.disabledText}
                        </span>
                      </div>
                    </Button>
                  </Link>
                )}

                {ipaConfig.enabled && (
                  <Link
                    href={releaseConfig.released ? ipaConfig.downloadUrl : "#"}
                    target={releaseConfig.released ? "_blank" : "_self"}
                  >
                    <Button
                      size="lg"
                      disabled={!releaseConfig.released}
                      className={`w-full ${
                        releaseConfig.released
                          ? `bg-gradient-to-r ${theme.gradients.ios} hover:${theme.gradients.iosHover} text-white border-0 px-6 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${theme.shadows.ios} transform-gpu group relative overflow-hidden`
                          : "bg-gradient-to-r from-red-700 to-red-800 text-white border-0 px-6 py-4 text-base font-semibold cursor-not-allowed opacity-75"
                      }`}
                    >
                      {releaseConfig.released && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      )}
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <span
                          className={`${releaseConfig.released ? "group-hover:scale-105" : ""} transition-transform duration-200`}
                        >
                          {releaseConfig.released ? "Download IOS" : releaseConfig.disabledText}
                        </span>
                      </div>
                    </Button>
                  </Link>
                )}
              </>
            )}

            <Link href="https://discord.gg/dwWvUjraq4" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className={`w-full bg-transparent border-2 border-gray-600 ${theme.text.secondary} hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-gray-500/20 transform-gpu group`}
              >
                <span className="group-hover:scale-105 transition-transform duration-200">Join Community</span>
              </Button>
            </Link>
          </div>

          {/* Device Detection Info */}
          <div className="mt-6">
            <p className={`text-xs ${theme.text.muted} opacity-75`}>
              {deviceType === "ios" && "iOS device detected"}
              {deviceType === "android" && "Android device detected"}
              {deviceType === "unknown" && "Device type: Unknown"}
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Features */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-sm mx-auto">
          <div className="grid gap-4">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-4 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 transform-gpu">
              <h3 className="text-lg font-semibold text-white mb-2">Mobile Optimized</h3>
              <p className={`${theme.text.primary} text-sm`}>
                Specially designed for mobile devices with touch-friendly interface.
              </p>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-4 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 transform-gpu">
              <h3 className="text-lg font-semibold text-white mb-2">
                {deviceType === "ios"
                  ? "iOS Compatible"
                  : deviceType === "android"
                    ? "Android Compatible"
                    : "Cross Platform"}
              </h3>
              <p className={`${theme.text.primary} text-sm`}>
                {deviceType === "ios"
                  ? "Optimized specifically for your iPhone or iPad device."
                  : deviceType === "android"
                    ? "Built specifically for your Android device."
                    : "Available for both Android (APK) and iOS (IPA) devices."}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile Tutorial Section */}
      {tutorialConfig.enabled && (
        <section className="relative z-10 py-12 px-4 border-t border-gray-800">
          <div className="max-w-sm mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {tutorialConfig.title}
              </h2>
              <div className={`w-16 h-1 bg-gradient-to-r ${theme.squares.from} ${theme.squares.to} mx-auto mb-4`}></div>
              <p className={`text-sm ${theme.text.primary} leading-relaxed`}>{tutorialConfig.description}</p>
            </div>

            {tutorialConfig.videoenabled && (
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-4 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] transform-gpu">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-900/50">
                  <iframe
                    src={tutorialConfig.videoUrl}
                    title={tutorialConfig.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={tutorialConfig.allowFullscreen}
                    style={{
                      border: "none",
                    }}
                  />
                </div>

                {tutorialConfig.duration && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                    <span className={`text-xs ${theme.text.secondary}`}>Duration: {tutorialConfig.duration}</span>
                  </div>
                )}
              </Card>
            )}

            <div className="mt-6">
              <p className={`text-xs ${theme.text.muted}`}>Need help? Join our Discord for support!</p>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Footer */}
      <footer className="relative z-10 py-6 px-4 border-t border-gray-800">
        <div className="text-center">
          <p className={`${theme.text.muted} text-sm`}>© 2025 GetMist Mobile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Update the main component logic
export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [initialCheck, setInitialCheck] = useState(true)
  const isMobile = useIsMobile()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Initial check to determine if we should show loading screen
  useEffect(() => {
    if (initialCheck) {
      // If mobile and not allowed, skip loading screen
      if (isMobile && !mobileConfig.mobileAllowed()) {
        setIsLoading(false)
      }
      setInitialCheck(false)
    }
  }, [isMobile, initialCheck])

  // Hide any v0 badges on component mount
  useEffect(() => {
    const hideV0Badges = () => {
      const selectors = ["[data-v0-t]", ".v0-badge", '[class*="v0"]', '[id*="v0"]', 'div[style*="v0"]']

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.display = "none"
            el.style.visibility = "hidden"
            el.style.opacity = "0"
          }
        })
      })
    }

    hideV0Badges()

    // Run periodically to catch any dynamically added badges
    const interval = setInterval(hideV0Badges, 1000)

    return () => clearInterval(interval)
  }, [])

  // Check for maintenance mode first - this overrides everything
  if (maintenanceConfig.maintenanceMode) {
    return <MaintenanceScreen />
  }

  // Show loading screen only for desktop or mobile when allowed
  if (isLoading && (!isMobile || mobileConfig.mobileAllowed())) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  if (isMobile) {
    if (mobileConfig.mobileAllowed()) {
      return <MobileSite />
    } else {
      return <MobileWarning />
    }
  }

  return <DesktopSite />
}
