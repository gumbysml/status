// Maintenance Mode Configuration
// Set maintenanceMode to true to enable maintenance mode
// Set to false to disable maintenance mode and show the normal website

export const maintenanceConfig = {
  // Change this to true to enable maintenance mode, false to disable
  maintenanceMode: false,

  // Maintenance message settings
  title: "Under Maintenance",
  message: "Sorry, we're having issues or updating right now. Please come back later!",

  // Additional settings
  showEstimatedTime: true,
  estimatedTime: "We'll be back soon",

  // Contact information during maintenance
  showDiscord: true,
  discordUrl: "https://discord.gg/gt2vRJV6",

  // Maintenance started time (for display purposes)
  maintenanceStarted: "2024-01-01T00:00:00Z",

  // Optional: Custom maintenance page styling
  customStyling: {
    backgroundColor: "from-gray-900 via-black to-gray-800",
    accentColor: "from-red-400 to-red-600",
    textColor: "text-gray-300",
  },
}
