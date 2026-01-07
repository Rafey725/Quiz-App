const cache = new Map()
const inFlight = new Map()

const getCache = (key: string) => {
    const entry = cache.get(key)
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
        cache.delete(key)
        return null;
    }

    return entry.value
}

const setCache = (key: string, value: any, ttlMs: number) => {
    cache.set(key, { value, expiresAt: Date.now() + ttlMs })
}

export const getOrFetchOnce = async (key: string, ttlMs: number, fetchFn: any) => {
    const cached = getCache(key)
    if (cached !== null) return cached

    const existingPromise = inFlight.get(key)
    if (existingPromise) return existingPromise

    const p = (async () => {
        try {
            const freshRes = await fetchFn()
            setCache(key, freshRes, ttlMs)
            return freshRes
        } finally {
            inFlight.delete(key)
        }
    })()

    inFlight.set(key, p)
    return p
}