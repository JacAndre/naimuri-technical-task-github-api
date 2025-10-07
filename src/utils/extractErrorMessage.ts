import axios from 'axios'

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'API error'
  }
  return 'Unexpected error'
}
