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