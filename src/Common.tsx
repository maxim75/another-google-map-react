export const isOnClient = typeof window !== 'undefined'

export async function waitForCondition(
    conditionFunc: () => boolean,
    interval: number
  ) {
    const promise = new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const conditionResult = conditionFunc()
        if (conditionResult) {
          clearInterval(intervalId)
          resolve(0)
        }
      }, interval)
    })
    return promise
  }

  export function loadScript(url: string) {
    if (isOnClient && typeof (window as any).google !== 'undefined') {
      return Promise.resolve()
    }
  
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      script.onload = resolve
      document.head.appendChild(script)
    })
  }