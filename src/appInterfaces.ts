/**
 * Provides basic pharmacie information
 */
export interface Pharmacie {
  name: string
  location?: Coordinate
  desc?: string
}

/**
 * Standard coordinates info
 */
export interface Coordinate {
  lat: number
  long: number
}
