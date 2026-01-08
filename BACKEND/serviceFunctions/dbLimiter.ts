type ReleaseFn = () => void;

export function createDbLimiter(options: {
    maxConcurrent: number,
    maxQueue?: number,
    maxWaitingTime?: number
}) {
    const maxQueue = options.maxQueue ?? 200;
    const maxWaitingTime = options.maxWaitingTime ?? 300;

    let active = 0
    let queue: ((release: ReleaseFn) => void)[] = []

    const tryReQueue = () => {
        if (active >= options.maxConcurrent) return
        const next = queue.shift()
        if (!next) return

        active++

        let released = false
        const release = () => {
            if (released) return
            released = true
            active--
            tryReQueue()
        }

        next(release)
    }

    const acquire = () => {
        new Promise((resolve, reject) => {
            // Resolve the promise immediately if the slot is available
            if (active < options.maxConcurrent) {
                active++
                let released = false
                return resolve(() => {
                    if (released) return
                    released = true
                    active--
                    tryReQueue()
                })
            }

            // Reject the queue if the queue list is full
            if (queue.length > maxQueue) {
                return reject(Object.assign(new Error('DB overloaded: queue full'), { code: 'DB_QUEUE_FULL' }))
            }
        })
    }
}