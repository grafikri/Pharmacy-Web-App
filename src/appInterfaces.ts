/**
 * Provides basic pharmacie information
 */
export interface Pharmacy {
  name: string
  address?: string
  location?: Coordinate | undefined
  distance?: string
  phone?: string
}

/**
 * Standard coordinates info
 */
export interface Coordinate {
  lat: number
  lng: number
}
