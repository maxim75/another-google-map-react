import * as React from 'react'
import { loadScript, waitForCondition } from './Common'

interface GoogleApiLoaderProps {
  gooleMapLoaderUrl: string
  children?: any
}

const isOnClient = typeof window !== 'undefined'

export function GoogleApiLoader(props: GoogleApiLoaderProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const google = (window as any).google
    if (google) {
      setIsLoaded(true)
      return
    }

    ;(async () => {
      if ((window as any).__LOADING_GOOGLEMAP__) {
        await waitForCondition(() => (window as any).google, 100)
      } else {
        ;(window as any).__LOADING_GOOGLEMAP__ = true
        await loadScript(props.gooleMapLoaderUrl)
        //await waitForCondition(() => new Date().getSeconds() % 10 == 0, 100)
      }
      setIsLoaded(true)
    })()
  }, [])
  return (
    <div>
      {isOnClient && isLoaded && props.children}
    </div>
  )
}
