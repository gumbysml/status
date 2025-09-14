// Tutorial Video Configuration
// Change the videoUrl below to update the tutorial video link

export const tutorialConfig = {
  enabled: false, // Set to false to hide the tutorial section
  videoenabled: false, // Set to false to remove the video player, true to show it
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Change this to your tutorial video URL
  title: "How to Use MIST",
  description: "Watch our comprehensive tutorial to get started with MIST executor",
  thumbnailUrl: "/placeholder.svg?height=315&width=560", // Optional custom thumbnail

  // Video settings
  allowFullscreen: true,
  showControls: true,
  autoplay: false,

  // Additional info
  duration: "5:30", // Display duration (optional)
  lastUpdated: "2024-01-01",
}
