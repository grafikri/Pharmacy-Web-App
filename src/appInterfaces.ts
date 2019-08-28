/**
 * Provides basic pharmacie information
 */
export interface Pharmacy {
  name: string
  address?: string
  location?: Coordinate
  distance?: string
  phone?: string
}

/**
 * Standard coordinates info
 */
export interface Coordinate {
  lat?: number
  long?: number
}
