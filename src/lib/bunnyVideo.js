export const isBunnyStreamPlayUrl = (value) =>
  /^https:\/\/video\.bunnycdn\.com\/play\/\d+\/[^/]+$/i.test(String(value || '').trim())

export const isDirectVideoFileUrl = (value) =>
  /\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(String(value || '').trim())
