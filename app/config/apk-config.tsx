// APK Download Configuration
// Change the downloadUrl below to update where the APK download button redirects

export const apkConfig = {
  enabled: false, // Set to false to disable the APK download button
  downloadUrl: "https://example.com/download/mist.apk", // Change this URL for APK downloads
  version: "1.0.0",
  fileSize: "25 MB",
  minAndroidVersion: "7.0",
  lastUpdated: "2024-01-01",

  // APK-specific settings
  packageName: "com.getmist.executor",
  permissions: ["INTERNET", "WRITE_EXTERNAL_STORAGE", "READ_EXTERNAL_STORAGE"],
}
