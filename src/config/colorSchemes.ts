export interface ColorScheme {
  id: string
  name: string
  primary: string
  secondary: string
}

export const presets: ColorScheme[] = [
  { id: 'emerald-blue', name: 'Emerald & Blue', primary: '#2e7d32', secondary: '#1565c0' },
  { id: 'indigo-violet', name: 'Indigo & Violet', primary: '#4f46e5', secondary: '#7c3aed' },
  { id: 'teal-cyan', name: 'Teal & Cyan', primary: '#0d9488', secondary: '#06b6d4' },
  { id: 'amber-orange', name: 'Amber & Orange', primary: '#d97706', secondary: '#ea580c' },
  { id: 'slate-blue', name: 'Slate & Blue', primary: '#475569', secondary: '#3b82f6' },
  { id: 'rose-pink', name: 'Rose & Pink', primary: '#e11d48', secondary: '#ec4899' },
]

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('')
}

function lightenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount)
}

function darkenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount))
}

export function applyColorScheme(primary: string, secondary: string) {
  const root = document.documentElement.style
  const pRgb = hexToRgb(primary)
  const sRgb = hexToRgb(secondary)

  root.setProperty('--color-primary', primary)
  root.setProperty('--color-primary-light', lightenColor(primary, 0.3))
  root.setProperty('--color-primary-dark', darkenColor(primary, 0.25))
  root.setProperty('--color-secondary', secondary)
  root.setProperty('--color-secondary-light', lightenColor(secondary, 0.3))
  root.setProperty('--color-secondary-dark', darkenColor(secondary, 0.25))
  root.setProperty('--color-accent', secondary)
  root.setProperty('--gradient-primary', `linear-gradient(135deg, ${primary}, ${secondary})`)
  root.setProperty(
    '--shadow-hover',
    `0 8px 30px rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.15), 0 4px 16px rgba(${sRgb.r}, ${sRgb.g}, ${sRgb.b}, 0.1)`,
  )
  root.setProperty('--color-primary-rgb', `${pRgb.r}, ${pRgb.g}, ${pRgb.b}`)
}
