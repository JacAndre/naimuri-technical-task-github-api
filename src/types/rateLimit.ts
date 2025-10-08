export interface RateLimit {
  rate: Rate
}
export interface Rate {
  limit: number
  remaining: number
  reset: number
  isExceeded: boolean
}
