export const GOOGLE_MAP_LOADER_URL = `https://maps.googleapis.com/maps/api/js?v=beta&libraries=places`;

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