import { hasSimd } from './WasmFeatureCheck'

// 检查 WASM
export const hasWasm = 'WebAssembly' in window
// 检查 getDisplayMedia
export const hasGetDisplayMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
// 检查 PictureInPicture
export const hasPictureInPicture = !!document.pictureInPictureEnabled
// Safari
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
// Android
export const isAndroid = /android/i.test(navigator.userAgent)
// iOS
export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
// SIMD
export const hasSIMD = hasSimd()
// 逐帧操作
export const hasRequestVideoFrameCallback = 'requestVideoFrameCallback' in HTMLVideoElement.prototype
// WebCodecs
export const hasWebCodecs = 'VideoDecoder' in window
// 本地
export const isLocal = process.env.VUE_APP_LOCALRES === 'true'
// OCR 需要 WASM，且如是本地则需要 SIMD
export const ocrCompatible = hasWasm && (isLocal ? hasSIMD : true)
// 识别器需要 OCR，且不是 Safari、Android、iOS
export const scannerCompatible = hasGetDisplayMedia && !isSafari && !isAndroid && !isIOS && ocrCompatible
// Edge 增强安全模式
export const edgeStrictMode = /Edg\/\d+/.test(navigator.userAgent) && !hasWasm
// Windows
export const isWindows = /Windows/.test(navigator.userAgent)
