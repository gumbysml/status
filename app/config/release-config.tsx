// Release Configuration
// Set released to true to enable all download buttons
// Set to false to disable all downloads and show "Not Released Yet"

export const releaseConfig = {
  // Change this to true to enable downloads, false to disable
  released: true,

  // Disabled button settings
  disabledText: "Not Released Yet",
  disabledSubtext: "Coming Soon",

  // Alternative messages you can use
  alternativeMessages: {
    maintenance: "Under Maintenance",
    development: "In Development",
    testing: "Beta Testing",
    soon: "Coming Soon",
    unreleased: "Not Released Yet",
  },

  // Release information
  expectedReleaseDate: "2025-02-01", // Optional: Expected release date
  version: "1.0.0",
  lastUpdated: "2025-01-28",

  // Additional settings
  showReleaseDate: false, // Set to true to show expected release date
  allowDiscord: true, // Keep Discord button enabled even when not released
}
