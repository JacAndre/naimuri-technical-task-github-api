import { ref } from 'vue'
import { fetchRateLimit } from '@/services/githubService'
import { defineStore } from 'pinia'

export const useRateLimitStore = defineStore('rate_limit', () => {
  const limit = ref<number>(5000)
  const remaining = ref<number>(5000)
  const reset = ref<number>(0)
  const isExceeded = ref<boolean>(false)

  async function checkRateLimit() {
    try {
      const data = await fetchRateLimit()
      limit.value = data.limit
      remaining.value = data.remaining
      reset.value = data.reset
      isExceeded.value = data.remaining === 0
    } catch (error: unknown) {
      console.warn('Rate limit check failed:', error)
    }
  }

  return {
    limit,
    remaining,
    reset,
    isExceeded,
    checkRateLimit,
  }
})
