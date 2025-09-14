// Mobile Configuration
// Set mobileAllowed to true to allow mobile users to access the site
// Set to false to show the "not available on mobile" message

export const mobileConfig = {
  // Change this function to control mobile access
  mobileAllowed: (): boolean => {
    return false // Set to true to allow mobile access, false to block
  },

  // Additional mobile settings
  version: "1.0.0",
  lastUpdated: "2024-01-01",

  // Mobile-specific features
  features: {
    apkSupported: true,
    ipaSupported: true,
    touchOptimized: true,
  },
}
