"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { maintenanceConfig } from "../config/maintenance-config"
import { getCurrentTheme } from "../config/theme-config"

// 3D Squares Background Component for Maintenance
function MaintenanceBackgroundSquares() {
  const theme = getCurrentTheme()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          <div
            className={`bg-gradient-to-br ${maintenanceConfig.customStyling.accentColor} transform rotate-45`}
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

export default function MaintenanceScreen() {
  const theme = getCurrentTheme()

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${maintenanceConfig.customStyling.backgroundColor} flex items-center justify-center p-4`}
    >
      <MaintenanceBackgroundSquares />

      <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-8 text-center max-w-lg relative z-10 shadow-2xl shadow-black/50">
        {/* Maintenance Icon */}
        <div className="mb-6">
          <div
            className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${maintenanceConfig.customStyling.accentColor} rounded-full flex items-center justify-center shadow-lg`}
          >
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">{maintenanceConfig.title}</h1>
          <div className={`w-24 h-1 bg-gradient-to-r ${maintenanceConfig.customStyling.accentColor} mx-auto`}></div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className={`text-lg ${maintenanceConfig.customStyling.textColor} leading-relaxed mb-4`}>
            {maintenanceConfig.message}
          </p>

          {maintenanceConfig.showEstimatedTime && (
            <p className="text-gray-400 text-sm">{maintenanceConfig.estimatedTime}</p>
          )}
        </div>

        {/* Animated Loading Dots */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 bg-gradient-to-r ${maintenanceConfig.customStyling.accentColor} rounded-full animate-pulse`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Discord Link */}
        {maintenanceConfig.showDiscord && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-4">For updates and support, join our Discord community:</p>
            <Link href={maintenanceConfig.discordUrl} target="_blank">
              <Button
                variant="outline"
                className={`bg-transparent border-gray-600 ${maintenanceConfig.customStyling.textColor} hover:bg-gray-800/50 hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 transform-gpu`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </Button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs">© 2025 GetMist. We'll be back online soon.</p>
        </div>
      </Card>
    </div>
  )
}
