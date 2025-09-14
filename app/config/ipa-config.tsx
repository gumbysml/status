// IPA Download Configuration
// Change the downloadUrl below to update where the IPA download button redirects

export const ipaConfig = {
  enabled: false, // Set to false to disable the IOS download button
  downloadUrl: "https://example.com/download/mist.ipa", // Change this URL for IPA downloads
  version: "1.0.0",
  fileSize: "30 MB",
  minIOSVersion: "12.0",
  lastUpdated: "2024-01-01",

  // IPA-specific settings
  bundleId: "com.getmist.executor",
  requiresJailbreak: false, // Set to true if jailbreak is required
  signingMethod: "enterprise", // enterprise, developer, or adhoc

  // Installation instructions
  installationNotes: "Install via AltStore or similar sideloading method",
}
